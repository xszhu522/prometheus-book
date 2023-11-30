import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as t,d as s}from"./app-tU1o2vQf.js";const l="/prometheus-book/assets/mail-alert-page-eGK4hsCk.png",n={},a=s(`<h1 id="与smtp邮件集成" tabindex="-1"><a class="header-anchor" href="#与smtp邮件集成" aria-hidden="true">#</a> 与SMTP邮件集成</h1><p>邮箱应该是目前企业最常用的告警通知方式，Alertmanager内置了对SMTP协议的支持，因此对于企业用户而言，只需要一些基本的配置即可实现通过邮件的通知。</p><p>在Alertmanager使用邮箱通知，用户只需要定义好SMTP相关的配置，并且在receiver中定义接收方的邮件地址即可。在Alertmanager中我们可以直接在配置文件的global中定义全局的SMTP配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  [ smtp_from: &lt;tmpl_string&gt; ]
  [ smtp_smarthost: &lt;string&gt; ]
  [ smtp_hello: &lt;string&gt; | default = &quot;localhost&quot; ]
  [ smtp_auth_username: &lt;string&gt; ]
  [ smtp_auth_password: &lt;secret&gt; ]
  [ smtp_auth_identity: &lt;string&gt; ]
  [ smtp_auth_secret: &lt;secret&gt; ]
  [ smtp_require_tls: &lt;bool&gt; | default = true ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成全局SMTP之后，我们只需要为receiver配置email_configs用于定义一组接收告警的邮箱地址即可，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name: &lt;string&gt;
email_configs:
  [ - &lt;email_config&gt;, ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个email_config中定义相应的接收人邮箱地址，邮件通知模板等信息即可，当然如果当前接收人需要单独的SMTP配置，那直接在email_config中覆盖即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[ send_resolved: &lt;boolean&gt; | default = false ]
to: &lt;tmpl_string&gt;
[ html: &lt;tmpl_string&gt; | default = &#39;{{ template &quot;email.default.html&quot; . }}&#39; ]
[ headers: { &lt;string&gt;: &lt;tmpl_string&gt;, ... } ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果当前收件人需要接受告警恢复的通知的话，在email_config中定义<code>send_resolved</code>为true即可。</p><p>如果所有的邮件配置使用了相同的SMTP配置，则可以直接定义全局的SMTP配置。</p><p>这里，以Gmail邮箱为例，我们定义了一个全局的SMTP配置，并且通过route将所有告警信息发送到default-receiver中:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  smtp_smarthost: smtp.gmail.com:587
  smtp_from: &lt;smtp mail from&gt;
  smtp_auth_username: &lt;usernae&gt;
  smtp_auth_identity: &lt;username&gt;
  smtp_auth_password: &lt;password&gt;

route:
  group_by: [&#39;alertname&#39;]
  receiver: &#39;default-receiver&#39;

receivers:
  - name: default-receiver
    email_configs:
      - to: &lt;mail to address&gt;
        send_resolved: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>需要注意的是新的Google账号安全规则需要使用“应用专有密码”作为邮箱登录密码</p></blockquote><p>这时如果手动拉高主机CPU使用率，使得监控样本数据满足告警触发条件。在SMTP配置正确的情况下，可以接收到如下的告警内容：</p><figure><img src="`+l+'" alt="告警" tabindex="0" loading="lazy"><figcaption>告警</figcaption></figure>',15),d=[a];function r(m,c){return i(),t("div",null,d)}const o=e(n,[["render",r],["__file","alert-with-smtp.html.vue"]]);export{o as default};
