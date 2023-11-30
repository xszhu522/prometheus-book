import{_ as e,a,b as i}from"./alertmanager-slicense-alerts-result-r8aeiGp2.js";import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as r,d as l}from"./app-tU1o2vQf.js";const d={},s=l(`<h1 id="屏蔽告警通知" tabindex="-1"><a class="header-anchor" href="#屏蔽告警通知" aria-hidden="true">#</a> 屏蔽告警通知</h1><p>Alertmanager提供了方式可以帮助用户控制告警通知的行为，包括预先定义的抑制机制和临时定义的静默规则。</p><h2 id="抑制机制" tabindex="-1"><a class="header-anchor" href="#抑制机制" aria-hidden="true">#</a> 抑制机制</h2><p>Alertmanager的抑制机制可以避免当某种问题告警产生之后用户接收到大量由此问题导致的一系列的其它告警通知。例如当集群不可用时，用户可能只希望接收到一条告警，告诉他这时候集群出现了问题，而不是大量的如集群中的应用异常、中间件服务异常的告警通知。</p><p>在Alertmanager配置文件中，使用inhibit_rules定义一组告警的抑制规则：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>inhibit_rules:
  [ - &lt;inhibit_rule&gt; ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每一条抑制规则的具体配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>target_match:
  [ &lt;labelname&gt;: &lt;labelvalue&gt;, ... ]
target_match_re:
  [ &lt;labelname&gt;: &lt;regex&gt;, ... ]

source_match:
  [ &lt;labelname&gt;: &lt;labelvalue&gt;, ... ]
source_match_re:
  [ &lt;labelname&gt;: &lt;regex&gt;, ... ]

[ equal: &#39;[&#39; &lt;labelname&gt;, ... &#39;]&#39; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当已经发送的告警通知匹配到target_match和target_match_re规则，当有新的告警规则如果满足source_match或者定义的匹配规则，并且已发送的告警与新产生的告警中equal定义的标签完全相同，则启动抑制机制，新的告警不会发送。</p><p>例如，定义如下抑制规则：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- source_match:
    alertname: NodeDown
    severity: critical
  target_match:
    severity: critical
  equal:
    - node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如当集群中的某一个主机节点异常宕机导致告警NodeDown被触发，同时在告警规则中定义了告警级别severity=critical。由于主机异常宕机，该主机上部署的所有服务，中间件会不可用并触发报警。根据抑制规则的定义，如果有新的告警级别为severity=critical，并且告警中标签node的值与NodeDown告警的相同，则说明新的告警是由NodeDown导致的，则启动抑制机制停止向接收器发送通知。</p><h2 id="临时静默" tabindex="-1"><a class="header-anchor" href="#临时静默" aria-hidden="true">#</a> 临时静默</h2><p>除了基于抑制机制可以控制告警通知的行为以外，用户或者管理员还可以直接通过Alertmanager的UI临时屏蔽特定的告警通知。通过定义标签的匹配规则(字符串或者正则表达式)，如果新的告警通知满足静默规则的设置，则停止向receiver发送通知。</p><p>进入Alertmanager UI，点击&quot;New Silence&quot;显示如下内容：</p><figure><img src="`+e+'" alt="创建静默规则" tabindex="0" loading="lazy"><figcaption>创建静默规则</figcaption></figure><p>用户可以通过该UI定义新的静默规则的开始时间以及持续时间，通过Matchers部分可以设置多条匹配规则(字符串匹配或者正则匹配)。填写当前静默规则的创建者以及创建原因后，点击&quot;Create&quot;按钮即可。</p><p>通过&quot;Preview Alerts&quot;可以查看预览当前匹配规则匹配到的告警信息。静默规则创建成功后，Alertmanager会开始加载该规则并且设置状态为Pending,当规则生效后则进行到Active状态。</p><figure><img src="'+a+'" alt="活动的静默规则" tabindex="0" loading="lazy"><figcaption>活动的静默规则</figcaption></figure><p>当静默规则生效以后，从Alertmanager的Alerts页面下用户将不会看到该规则匹配到的告警信息。</p><figure><img src="'+i+'" alt="告警信息" tabindex="0" loading="lazy"><figcaption>告警信息</figcaption></figure><p>对于已经生效的规则，用户可以通过手动点击“Expire”按钮使当前规则过期。</p>',22),c=[s];function m(u,o){return t(),r("div",null,c)}const b=n(d,[["render",m],["__file","alert-manager-inhibit.html.vue"]]);export{b as default};
