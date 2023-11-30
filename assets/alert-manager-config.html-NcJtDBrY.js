import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as i,d as l}from"./app-NWC4HiYT.js";const n={},s=l(`<h1 id="alertmanager配置概述" tabindex="-1"><a class="header-anchor" href="#alertmanager配置概述" aria-hidden="true">#</a> Alertmanager配置概述</h1><p>在上面的部分中已经简单介绍过，在Alertmanager中通过路由(Route)来定义告警的处理方式。路由是一个基于标签匹配的树状匹配结构。根据接收到告警的标签匹配相应的处理方式。这里将详细介绍路由相关的内容。</p><p>Alertmanager主要负责对Prometheus产生的告警进行统一处理，因此在Alertmanager配置中一般会包含以下几个主要部分：</p><ul><li>全局配置（global）：用于定义一些全局的公共参数，如全局的SMTP配置，Slack配置等内容；</li><li>模板（templates）：用于定义告警通知时的模板，如HTML模板，邮件模板等；</li><li>告警路由（route）：根据标签匹配，确定当前告警应该如何处理；</li><li>接收人（receivers）：接收人是一个抽象的概念，它可以是一个邮箱也可以是微信，Slack或者Webhook等，接收人一般配合告警路由使用；</li><li>抑制规则（inhibit_rules）：合理设置抑制规则可以减少垃圾告警的产生</li></ul><p>其完整配置格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  [ resolve_timeout: &lt;duration&gt; | default = 5m ]
  [ smtp_from: &lt;tmpl_string&gt; ] 
  [ smtp_smarthost: &lt;string&gt; ] 
  [ smtp_hello: &lt;string&gt; | default = &quot;localhost&quot; ]
  [ smtp_auth_username: &lt;string&gt; ]
  [ smtp_auth_password: &lt;secret&gt; ]
  [ smtp_auth_identity: &lt;string&gt; ]
  [ smtp_auth_secret: &lt;secret&gt; ]
  [ smtp_require_tls: &lt;bool&gt; | default = true ]
  [ slack_api_url: &lt;secret&gt; ]
  [ victorops_api_key: &lt;secret&gt; ]
  [ victorops_api_url: &lt;string&gt; | default = &quot;https://alert.victorops.com/integrations/generic/20131114/alert/&quot; ]
  [ pagerduty_url: &lt;string&gt; | default = &quot;https://events.pagerduty.com/v2/enqueue&quot; ]
  [ opsgenie_api_key: &lt;secret&gt; ]
  [ opsgenie_api_url: &lt;string&gt; | default = &quot;https://api.opsgenie.com/&quot; ]
  [ hipchat_api_url: &lt;string&gt; | default = &quot;https://api.hipchat.com/&quot; ]
  [ hipchat_auth_token: &lt;secret&gt; ]
  [ wechat_api_url: &lt;string&gt; | default = &quot;https://qyapi.weixin.qq.com/cgi-bin/&quot; ]
  [ wechat_api_secret: &lt;secret&gt; ]
  [ wechat_api_corp_id: &lt;string&gt; ]
  [ http_config: &lt;http_config&gt; ]

templates:
  [ - &lt;filepath&gt; ... ]

route: &lt;route&gt;

receivers:
  - &lt;receiver&gt; ...

inhibit_rules:
  [ - &lt;inhibit_rule&gt; ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在全局配置中需要注意的是<code>resolve_timeout</code>，该参数定义了当Alertmanager持续多长时间未接收到告警后标记告警状态为resolved（已解决）。该参数的定义可能会影响到告警恢复通知的接收时间，读者可根据自己的实际场景进行定义，其默认值为5分钟。在接下来的部分，我们将已一些实际的例子解释Alertmanager的其它配置内容。</p>`,7),r=[s];function a(d,c){return t(),i("div",null,r)}const o=e(n,[["render",a],["__file","alert-manager-config.html.vue"]]);export{o as default};
