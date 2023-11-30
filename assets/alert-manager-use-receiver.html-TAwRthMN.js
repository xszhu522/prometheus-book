import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as n,d as s}from"./app-d7bHIUBF.js";const a={},r=s(`<h1 id="内置告警接收器receiver" tabindex="-1"><a class="header-anchor" href="#内置告警接收器receiver" aria-hidden="true">#</a> 内置告警接收器Receiver</h1><p>前上一小节已经讲过，在Alertmanager中路由负责对告警信息进行分组匹配，并将像告警接收器发送通知。告警接收器可以通过以下形式进行配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>receivers:
  - &lt;receiver&gt; ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每一个receiver具有一个全局唯一的名称，并且对应一个或者多个通知方式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name: &lt;string&gt;
email_configs:
  [ - &lt;email_config&gt;, ... ]
hipchat_configs:
  [ - &lt;hipchat_config&gt;, ... ]
pagerduty_configs:
  [ - &lt;pagerduty_config&gt;, ... ]
pushover_configs:
  [ - &lt;pushover_config&gt;, ... ]
slack_configs:
  [ - &lt;slack_config&gt;, ... ]
opsgenie_configs:
  [ - &lt;opsgenie_config&gt;, ... ]
webhook_configs:
  [ - &lt;webhook_config&gt;, ... ]
victorops_configs:
  [ - &lt;victorops_config&gt;, ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前官方内置的第三方通知集成包括：邮件、 即时通讯软件（如Slack、Hipchat）、移动应用消息推送(如Pushover)和自动化运维工具（例如：Pagerduty、Opsgenie、Victorops）。Alertmanager的通知方式中还可以支持Webhook，通过这种方式开发者可以实现更多个性化的扩展支持。</p>`,6),c=[r];function l(t,d){return i(),n("div",null,c)}const g=e(a,[["render",l],["__file","alert-manager-use-receiver.html.vue"]]);export{g as default};
