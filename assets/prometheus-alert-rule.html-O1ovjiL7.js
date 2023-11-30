import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as d,c as o,a as e,b as n,e as a,d as s}from"./app-tU1o2vQf.js";const t="/prometheus-book/assets/prometheus-ui-alert-lrs3-HsG.png",u="/prometheus-book/assets/prometheus-ui-rules-M06OgsFl.png",c="/prometheus-book/assets/node_cpu_usgae_high-LdsKXwKW.png",m="/prometheus-book/assets/node_cpu_alert_pending-zUSW2swU.png",v="/prometheus-book/assets/node_cpu_alert_firing-tEMQdXDq.png",p={},b=s(`<h1 id="自定义prometheus告警规则" tabindex="-1"><a class="header-anchor" href="#自定义prometheus告警规则" aria-hidden="true">#</a> 自定义Prometheus告警规则</h1><p>Prometheus中的告警规则允许你基于PromQL表达式定义告警触发条件，Prometheus后端对这些触发规则进行周期性计算，当满足触发条件后则会触发告警通知。默认情况下，用户可以通过Prometheus的Web界面查看这些告警规则以及告警的触发状态。当Prometheus与Alertmanager关联之后，可以将告警发送到外部服务如Alertmanager中并通过Alertmanager可以对这些告警进行进一步的处理。</p><h2 id="定义告警规则" tabindex="-1"><a class="header-anchor" href="#定义告警规则" aria-hidden="true">#</a> 定义告警规则</h2><p>一条典型的告警规则如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>groups:
- name: example
  rules:
  - alert: HighErrorRate
    expr: job:request_latency_seconds:mean5m{job=&quot;myjob&quot;} &gt; 0.5
    for: 10m
    labels:
      severity: page
    annotations:
      summary: High request latency
      description: description info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在告警规则文件中，我们可以将一组相关的规则设置定义在一个group下。在每一个group中我们可以定义多个告警规则(rule)。一条告警规则主要由以下几部分组成：</p><ul><li>alert：告警规则的名称。</li><li>expr：基于PromQL表达式告警触发条件，用于计算是否有时间序列满足该条件。</li><li>for：评估等待时间，可选参数。用于表示只有当触发条件持续一段时间后才发送告警。在等待期间新产生告警的状态为pending。</li><li>labels：自定义标签，允许用户指定要附加到告警上的一组附加标签。</li><li>annotations：用于指定一组附加信息，比如用于描述告警详细信息的文字等，annotations的内容在告警产生时会一同作为参数发送到Alertmanager。</li></ul><p>为了能够让Prometheus启用定义的告警规则，我们需要在Prometheus全局配置文件中通过__rule_files__指定一组告警规则文件的访问路径，Prometheus启动后会自动扫描这些路径下规则文件中定义的内容，并且根据这些规则计算是否向外部发送通知：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rule_files:
  [ - &lt;filepath_glob&gt; ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下Prometheus会每分钟对这些告警规则进行计算，如果用户想定义自己的告警计算周期，则可以通过<code>evaluation_interval</code>来覆盖默认的计算周期：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  [ evaluation_interval: &lt;duration&gt; | default = 1m ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板化" tabindex="-1"><a class="header-anchor" href="#模板化" aria-hidden="true">#</a> 模板化</h2><p>一般来说，在告警规则文件的annotations中使用<code>summary</code>描述告警的概要信息，<code>description</code>用于描述告警的详细信息。同时Alertmanager的UI也会根据这两个标签值，显示告警信息。为了让告警信息具有更好的可读性，Prometheus支持模板化label和annotations的中标签的值。</p><p>通过<code>$labels.&lt;labelname&gt;</code>变量可以访问当前告警实例中指定标签的值。$value则可以获取当前PromQL表达式计算的样本值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># To insert a firing element&#39;s label values:
{{ $labels.&lt;labelname&gt; }}
# To insert the numeric expression value of the firing element:
{{ $value }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，可以通过模板化优化summary以及description的内容的可读性：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>groups:
- name: example
  rules:

  # Alert for any instance that is unreachable for &gt;5 minutes.
  - alert: InstanceDown
    expr: up == 0
    for: 5m
    labels:
      severity: page
    annotations:
      summary: &quot;Instance {{ $labels.instance }} down&quot;
      description: &quot;{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 5 minutes.&quot;

  # Alert for any instance that has a median request latency &gt;1s.
  - alert: APIHighRequestLatency
    expr: api_http_request_latencies_second{quantile=&quot;0.5&quot;} &gt; 1
    for: 10m
    annotations:
      summary: &quot;High request latency on {{ $labels.instance }}&quot;
      description: &quot;{{ $labels.instance }} has a median request latency above 1s (current value: {{ $value }}s)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看告警状态" tabindex="-1"><a class="header-anchor" href="#查看告警状态" aria-hidden="true">#</a> 查看告警状态</h2><p>如下所示，用户可以通过Prometheus WEB界面中的Alerts菜单查看当前Prometheus下的所有告警规则，以及其当前所处的活动状态。</p><figure><img src="`+t+`" alt="告警活动状态" tabindex="0" loading="lazy"><figcaption>告警活动状态</figcaption></figure><p>同时对于已经pending或者firing的告警，Prometheus也会将它们存储到时间序列ALERTS{}中。</p><p>可以通过表达式，查询告警实例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ALERTS{alertname=&quot;&lt;alert name&gt;&quot;, alertstate=&quot;pending|firing&quot;, &lt;additional alert labels&gt;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>样本值为1表示当前告警处于活动状态（pending或者firing），当告警从活动状态转换为非活动状态时，样本值则为0。</p><h2 id="实例-定义主机监控告警" tabindex="-1"><a class="header-anchor" href="#实例-定义主机监控告警" aria-hidden="true">#</a> 实例：定义主机监控告警</h2><p>修改Prometheus配置文件prometheus.yml,添加以下配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rule_files:
  - /etc/prometheus/rules/*.rules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在目录/etc/prometheus/rules/下创建告警文件hoststats-alert.rules内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>groups:
- name: hostStatsAlert
  rules:
  - alert: hostCpuUsageAlert
    expr: sum(avg without (cpu)(irate(node_cpu{mode!=&#39;idle&#39;}[5m]))) by (instance) &gt; 0.85
    for: 1m
    labels:
      severity: page
    annotations:
      summary: &quot;Instance {{ $labels.instance }} CPU usgae high&quot;
      description: &quot;{{ $labels.instance }} CPU usage above 85% (current value: {{ $value }})&quot;
  - alert: hostMemUsageAlert
    expr: (node_memory_MemTotal - node_memory_MemAvailable)/node_memory_MemTotal &gt; 0.85
    for: 1m
    labels:
      severity: page
    annotations:
      summary: &quot;Instance {{ $labels.instance }} MEM usgae high&quot;
      description: &quot;{{ $labels.instance }} MEM usage above 85% (current value: {{ $value }})&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29),g={href:"http://127.0.0.1:9090/rules",target:"_blank",rel:"noopener noreferrer"},h=e("figure",null,[e("img",{src:u,alt:"告警规则",tabindex:"0",loading:"lazy"}),e("figcaption",null,"告警规则")],-1),_={href:"http://127.0.0.1:9090/alerts",target:"_blank",rel:"noopener noreferrer"},f=s('<figure><img src="'+t+`" alt="告警活动状态" tabindex="0" loading="lazy"><figcaption>告警活动状态</figcaption></figure><p>此时，我们可以手动拉高系统的CPU使用率，验证Prometheus的告警流程，在主机上运行以下命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat /dev/zero&gt;/dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行命令后查看CPU使用率情况，如下图所示：</p><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Prometheus首次检测到满足触发条件后，hostCpuUsageAlert显示由一条告警处于活动状态。由于告警规则中设置了1m的等待时间，当前告警状态为PENDING，如下图所示：</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果1分钟后告警条件持续满足，则会实际触发告警并且告警状态为FIRING，如下图所示：</p><figure><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="接下来" tabindex="-1"><a class="header-anchor" href="#接下来" aria-hidden="true">#</a> 接下来</h2><p>在这一小节中介绍了如何配置和使用Prometheus提供的告警能力，并且尝试实现了对主机CPU以及内存的告警规则设置。目前为止，我们只能通过Prometheus UI查看当前告警的活动状态。接下来，我们将尝试利用Prometheus体系中的另一个组件Alertmanager对这些触发的告警进行处理，实现告警通知。</p>',11);function x(q,y){const i=r("ExternalLinkIcon");return d(),o("div",null,[b,e("p",null,[n("重启Prometheus后访问Prometheus UI"),e("a",g,[n("http://127.0.0.1:9090/rules"),a(i)]),n("可以查看当前以加载的规则文件。")]),h,e("p",null,[n("切换到Alerts标签"),e("a",_,[n("http://127.0.0.1:9090/alerts"),a(i)]),n("可以查看当前告警的活动状态。")]),f])}const $=l(p,[["render",x],["__file","prometheus-alert-rule.html.vue"]]);export{$ as default};
