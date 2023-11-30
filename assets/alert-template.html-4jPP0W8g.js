import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as r,c as i,a as t,b as e,e as n,d}from"./app-tU1o2vQf.js";const c={},o=t("h1",{id:"自定义告警模板",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#自定义告警模板","aria-hidden":"true"},"#"),e(" 自定义告警模板")],-1),m={href:"https://github.com/prometheus/alertmanager/blob/master/template/default.tmpl",target:"_blank",rel:"noopener noreferrer"},p={href:"http://golang.org/pkg/text/template",target:"_blank",rel:"noopener noreferrer"},u=d(`<p>第一种，基于模板字符串。用户可以直接在Alertmanager的配置文件中使用模板字符串，例如:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>receivers:
- name: &#39;slack-notifications&#39;
  slack_configs:
  - channel: &#39;#alerts&#39;
    text: &#39;https://internal.myorg.net/wiki/alerts/{{ .GroupLabels.app }}/{{ .GroupLabels.alertname }}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种方式，自定义可复用的模板文件。例如，可以创建自定义模板文件custom-template.tmpl，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ define &quot;slack.myorg.text&quot; }}https://internal.myorg.net/wiki/alerts/{{ .GroupLabels.app }}/{{ .GroupLabels.alertname }}{{ end}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过在Alertmanager的全局设置中定义templates配置来指定自定义模板的访问路径:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Files from which custom notification template definitions are read.
# The last component may use a wildcard matcher, e.g. &#39;templates/*.tmpl&#39;.
templates:
  [ - &lt;filepath&gt; ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在设置了自定义模板的访问路径后，用户则可以直接在配置中使用该模板：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>receivers:
- name: &#39;slack-notifications&#39;
  slack_configs:
  - channel: &#39;#alerts&#39;
    text: &#39;{{ template &quot;slack.myorg.text&quot; . }}&#39;

templates:
- &#39;/etc/alertmanager/templates/myorg.tmpl&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function v(g,b){const a=s("ExternalLinkIcon");return r(),i("div",null,[o,t("p",null,[e("默认情况下Alertmanager使用了系统自带的默认通知模板，模板源码可以从"),t("a",m,[e("https://github.com/prometheus/alertmanager/blob/master/template/default.tmpl"),n(a)]),e("获得。Alertmanager的通知模板基于"),t("a",p,[e("Go的模板系统"),n(a)]),e("。Alertmanager也支持用户定义和使用自己的模板，一般来说有两种方式可以选择。")]),u])}const _=l(c,[["render",v],["__file","alert-template.html.vue"]]);export{_ as default};
