import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as d,c as r,a as e,b as n,e as a,d as l}from"./app-tU1o2vQf.js";const v="/prometheus-book/assets/wechat-alert-page-osAV5Ajv.png",c={},u=e("h1",{id:"与企业微信集成",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#与企业微信集成","aria-hidden":"true"},"#"),n(" 与企业微信集成")],-1),o=e("p",null,"Alertmanager已经内置了对企业微信的支持，我们可以通过企业微信来管理报警，更进一步可以通过企业微信和微信的互通来直接将告警消息转发到个人微信上。",-1),m={href:"https://prometheus.io/docs/alerting/configuration/#wechat_config",target:"_blank",rel:"noopener noreferrer"},b=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Whether or not to notify about resolved alerts.
[ send_resolved: &lt;boolean&gt; | default = false ]

# The API key to use when talking to the WeChat API.
[ api_secret: &lt;secret&gt; | default = global.wechat_api_secret ]

# The WeChat API URL.
[ api_url: &lt;string&gt; | default = global.wechat_api_url ]

# The corp id for authentication.
[ corp_id: &lt;string&gt; | default = global.wechat_api_corp_id ]

# API request data as defined by the WeChat API.
[ message: &lt;tmpl_string&gt; | default = &#39;{{ template &quot;wechat.default.message&quot; . }}&#39; ]
[ agent_id: &lt;string&gt; | default = &#39;{{ template &quot;wechat.default.agent_id&quot; . }}&#39; ]
[ to_user: &lt;string&gt; | default = &#39;{{ template &quot;wechat.default.to_user&quot; . }}&#39; ]
[ to_party: &lt;string&gt; | default = &#39;{{ template &quot;wechat.default.to_party&quot; . }}&#39; ]
[ to_tag: &lt;string&gt; | default = &#39;{{ template &quot;wechat.default.to_tag&quot; . }}&#39; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),p={href:"https://work.weixin.qq.com/api/doc#90000/90135/90665",target:"_blank",rel:"noopener noreferrer"},g=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  resolve_timeout: 10m
  wechat_api_url: &#39;https://qyapi.weixin.qq.com/cgi-bin/&#39;
  wechat_api_secret: &#39;应用的secret，在应用的配置页面可以看到&#39;
  wechat_api_corp_id: &#39;企业id，在企业的配置页面可以看到&#39;
templates:
- &#39;/etc/alertmanager/config/*.tmpl&#39;
route:
  group_by: [&#39;alertname&#39;]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 12h
  routes:
  - receiver: &#39;wechat&#39;
    continue: true
inhibit_rules:
- source_match:
receivers:
- name: &#39;wechat&#39;
  wechat_configs:
  - send_resolved: false
    corp_id: &#39;企业id，在企业的配置页面可以看到&#39;
    to_user: &#39;@all&#39;
    to_party: &#39; PartyID1 | PartyID2 &#39;
    message: &#39;{{ template &quot;wechat.default.message&quot; . }}&#39;
    agent_id: &#39;应用的AgentId，在应用的配置页面可以看到&#39;
    api_secret: &#39;应用的secret，在应用的配置页面可以看到&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置模板示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ define &quot;wechat.default.message&quot; }}
{{- if gt (len .Alerts.Firing) 0 -}}
{{- range $index, $alert := .Alerts -}}
{{- if eq $index 0 -}}
告警类型: {{ $alert.Labels.alertname }}
告警级别: {{ $alert.Labels.severity }}

=====================
{{- end }}
===告警详情===
告警详情: {{ $alert.Annotations.message }}
故障时间: {{ $alert.StartsAt.Format &quot;2006-01-02 15:04:05&quot; }}
===参考信息===
{{ if gt (len $alert.Labels.instance) 0 -}}故障实例ip: {{ $alert.Labels.instance }};{{- end -}}
{{- if gt (len $alert.Labels.namespace) 0 -}}故障实例所在namespace: {{ $alert.Labels.namespace }};{{- end -}}
{{- if gt (len $alert.Labels.node) 0 -}}故障物理机ip: {{ $alert.Labels.node }};{{- end -}}
{{- if gt (len $alert.Labels.pod_name) 0 -}}故障pod名称: {{ $alert.Labels.pod_name }}{{- end }}
=====================
{{- end }}
{{- end }}

{{- if gt (len .Alerts.Resolved) 0 -}}
{{- range $index, $alert := .Alerts -}}
{{- if eq $index 0 -}}
告警类型: {{ $alert.Labels.alertname }}
告警级别: {{ $alert.Labels.severity }}

=====================
{{- end }}
===告警详情===
告警详情: {{ $alert.Annotations.message }}
故障时间: {{ $alert.StartsAt.Format &quot;2006-01-02 15:04:05&quot; }}
恢复时间: {{ $alert.EndsAt.Format &quot;2006-01-02 15:04:05&quot; }}
===参考信息===
{{ if gt (len $alert.Labels.instance) 0 -}}故障实例ip: {{ $alert.Labels.instance }};{{- end -}}
{{- if gt (len $alert.Labels.namespace) 0 -}}故障实例所在namespace: {{ $alert.Labels.namespace }};{{- end -}}
{{- if gt (len $alert.Labels.node) 0 -}}故障物理机ip: {{ $alert.Labels.node }};{{- end -}}
{{- if gt (len $alert.Labels.pod_name) 0 -}}故障pod名称: {{ $alert.Labels.pod_name }};{{- end }}
=====================
{{- end }}
{{- end }}
{{- end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时如果某一容器频繁重启，可以接收到如下的告警内容：</p><figure><img src="`+v+'" alt="告警" tabindex="0" loading="lazy"><figcaption>告警</figcaption></figure>',5);function _(h,f){const i=t("ExternalLinkIcon");return d(),r("div",null,[u,o,e("p",null,[e("a",m,[n("prometheus官网"),a(i)]),n("中给出了企业微信的相关配置说明")]),b,e("p",null,[n("企业微信相关概念说明请参考"),e("a",p,[n("企业微信API说明"),a(i)]),n("，可以在企业微信的后台中建立多个应用，每个应用对应不同的报警分组，由企业微信来做接收成员的划分。具体配置参考如下：")]),g])}const x=s(c,[["render",_],["__file","alert-with-wechat.html.vue"]]);export{x as default};
