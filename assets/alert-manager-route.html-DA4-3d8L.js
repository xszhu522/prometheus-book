import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as r,d as a}from"./app-tU1o2vQf.js";const i={},t=a(`<h1 id="基于标签的告警路由" tabindex="-1"><a class="header-anchor" href="#基于标签的告警路由" aria-hidden="true">#</a> 基于标签的告警路由</h1><p>在Alertmanager的配置中会定义一个基于标签匹配规则的告警路由树，以确定在接收到告警后Alertmanager需要如何对其进行处理：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>route: &lt;route&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中route中则主要定义了告警的路由匹配规则，以及Alertmanager需要将匹配到的告警发送给哪一个receiver，一个最简单的route定义如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>route:
  group_by: [&#39;alertname&#39;]
  receiver: &#39;web.hook&#39;
receivers:
- name: &#39;web.hook&#39;
  webhook_configs:
  - url: &#39;http://127.0.0.1:5001/&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示：在Alertmanager配置文件中，我们只定义了一个路由，那就意味着所有由Prometheus产生的告警在发送到Alertmanager之后都会通过名为<code>web.hook</code>的receiver接收。这里的web.hook定义为一个webhook地址。当然实际场景下，告警处理可不是这么简单的一件事情，对于不同级别的告警，我们可能会有完全不同的处理方式，因此在route中，我们还可以定义更多的子Route，这些Route通过标签匹配告警的处理方式，route的完整定义如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[ receiver: &lt;string&gt; ]
[ group_by: &#39;[&#39; &lt;labelname&gt;, ... &#39;]&#39; ]
[ continue: &lt;boolean&gt; | default = false ]

match:
  [ &lt;labelname&gt;: &lt;labelvalue&gt;, ... ]

match_re:
  [ &lt;labelname&gt;: &lt;regex&gt;, ... ]

[ group_wait: &lt;duration&gt; | default = 30s ]
[ group_interval: &lt;duration&gt; | default = 5m ]
[ repeat_interval: &lt;duration&gt; | default = 4h ]

routes:
  [ - &lt;route&gt; ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由匹配" tabindex="-1"><a class="header-anchor" href="#路由匹配" aria-hidden="true">#</a> 路由匹配</h2><p>每一个告警都会从配置文件中顶级的route进入路由树，需要注意的是顶级的route必须匹配所有告警(即不能有任何的匹配设置match和match_re)，每一个路由都可以定义自己的接受人以及匹配规则。默认情况下，告警进入到顶级route后会遍历所有的子节点，直到找到最深的匹配route，并将告警发送到该route定义的receiver中。但如果route中设置<strong>continue</strong>的值为false，那么告警在匹配到第一个子节点之后就直接停止。如果<strong>continue</strong>为true，报警则会继续进行后续子节点的匹配。如果当前告警匹配不到任何的子节点，那该告警将会基于当前路由节点的接收器配置方式进行处理。</p><p>其中告警的匹配有两种方式可以选择。一种方式基于字符串验证，通过设置<strong>match</strong>规则判断当前告警中是否存在标签labelname并且其值等于labelvalue。第二种方式则基于正则表达式，通过设置<strong>match_re</strong>验证当前告警标签的值是否满足正则表达式的内容。</p><p>如果警报已经成功发送通知, 如果想设置发送告警通知之前要等待时间，则可以通过<strong>repeat_interval</strong>参数进行设置。</p><h2 id="告警分组" tabindex="-1"><a class="header-anchor" href="#告警分组" aria-hidden="true">#</a> 告警分组</h2><p>在之前的部分有讲过，Alertmanager可以对告警通知进行分组，将多条告警合合并为一个通知。这里我们可以使用<strong>group_by</strong>来定义分组规则。基于告警中包含的标签，如果满足<strong>group_by</strong>中定义标签名称，那么这些告警将会合并为一个通知发送给接收器。</p><p>有的时候为了能够一次性收集和发送更多的相关信息时，可以通过<strong>group_wait</strong>参数设置等待时间，如果在等待时间内，当前group接收到了新的告警，这些告警将会合并为一个通知向receiver发送。</p><p>而<strong>group_interval</strong>配置，则用于定义相同的Group之间发送告警通知的时间间隔。</p><p>例如，当使用Prometheus监控多个集群以及部署在集群中的应用和数据库服务，并且定义以下的告警处理路由规则来对集群中的异常进行通知。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>route:
  receiver: &#39;default-receiver&#39;
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  group_by: [cluster, alertname]
  routes:
  - receiver: &#39;database-pager&#39;
    group_wait: 10s
    match_re:
      service: mysql|cassandra
  - receiver: &#39;frontend-pager&#39;
    group_by: [product, environment]
    match:
      team: frontend
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下所有的告警都会发送给集群管理员default-receiver，因此在Alertmanager的配置文件的根路由中，对告警信息按照集群以及告警的名称对告警进行分组。</p><p>如果告警时来源于数据库服务如MySQL或者Cassandra，此时则需要将告警发送给相应的数据库管理员(database-pager)。这里定义了一个单独子路由，如果告警中包含service标签，并且service为MySQL或者Cassandra,则向database-pager发送告警通知，由于这里没有定义group_by等属性，这些属性的配置信息将从上级路由继承，database-pager将会接收到按cluster和alertname进行分组的告警通知。</p><p>而某些告警规则可能来源于开发团队的定义，这些告警中通过添加标签team来标示这些告警的创建者。在Alertmanager配置文件的告警路由下，定义单独子路由用于处理这一类的告警通知，如果匹配到告警中包含标签team，并且team的值为frontend，Alertmanager将会按照标签product和environment对告警进行分组。此时如果应用出现异常，开发团队就能清楚的知道哪一个环境(environment)中的哪一个应用程序出现了问题，可以快速对应用进行问题定位。</p>`,20),l=[t];function s(d,u){return n(),r("div",null,l)}const c=e(i,[["render",s],["__file","alert-manager-route.html.vue"]]);export{c as default};
