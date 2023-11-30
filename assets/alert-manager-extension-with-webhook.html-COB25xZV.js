import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o,c as r,a as e,b as n,e as i,d as a}from"./app-NWC4HiYT.js";const d="/prometheus-book/assets/dingding-group-robot-oHuUG24v.png",u="/prometheus-book/assets/dingtalk-robot-create-webhook-yf39v8In.png",c="/prometheus-book/assets/dingtalk-message-test-_ZAShBV1.png",v="/prometheus-book/assets/alertmanager-dingtalk-test-result-tY71kEyf.png",p={},m=a(`<h1 id="使用webhook扩展alertmanager" tabindex="-1"><a class="header-anchor" href="#使用webhook扩展alertmanager" aria-hidden="true">#</a> 使用Webhook扩展Alertmanager</h1><p>在某些情况下除了Alertmanager已经内置的集中告警通知方式以外，对于不同的用户和组织而言还需要一些自定义的告知方式支持。通过Alertmanager提供的webhook支持可以轻松实现这一类的扩展。除了用于支持额外的通知方式，webhook还可以与其他第三方系统集成实现运维自动化，或者弹性伸缩等。</p><p>在Alertmanager中可以使用如下配置定义基于webhook的告警接收器receiver。一个receiver可以对应一组webhook配置。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> &lt;string<span class="token punctuation">&gt;</span>
<span class="token key atrule">webhook_configs</span><span class="token punctuation">:</span>
  <span class="token punctuation">[</span> <span class="token punctuation">-</span> &lt;webhook_config<span class="token punctuation">&gt;</span><span class="token punctuation">,</span> <span class="token punctuation">...</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每一项webhook_config的具体配置格式如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># Whether or not to notify about resolved alerts.</span>
<span class="token punctuation">[</span> <span class="token key atrule">send_resolved</span><span class="token punctuation">:</span> &lt;boolean<span class="token punctuation">&gt;</span> <span class="token punctuation">|</span> default = true <span class="token punctuation">]</span>

<span class="token comment"># The endpoint to send HTTP POST requests to.</span>
<span class="token key atrule">url</span><span class="token punctuation">:</span> &lt;string<span class="token punctuation">&gt;</span>

<span class="token comment"># The HTTP client&#39;s configuration.</span>
<span class="token punctuation">[</span> <span class="token key atrule">http_config</span><span class="token punctuation">:</span> &lt;http_config<span class="token punctuation">&gt;</span> <span class="token punctuation">|</span> default = global.http_config <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>send_resolved用于指定是否在告警消除时发送回执消息。url则是用于接收webhook请求的地址。http_configs则是在需要对请求进行SSL配置时使用。</p><p>当用户定义webhook用于接收告警信息后，当告警被触发时，Alertmanager会按照以下格式向这些url地址发送HTTP Post请求，请求内容如下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;groupKey&quot;</span><span class="token operator">:</span> &lt;string&gt;<span class="token punctuation">,</span>    <span class="token comment">// key identifying the group of alerts (e.g. to deduplicate)</span>
  <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;resolved|firing&gt;&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;receiver&quot;</span><span class="token operator">:</span> &lt;string&gt;<span class="token punctuation">,</span>
  <span class="token property">&quot;groupLabels&quot;</span><span class="token operator">:</span> &lt;object&gt;<span class="token punctuation">,</span>
  <span class="token property">&quot;commonLabels&quot;</span><span class="token operator">:</span> &lt;object&gt;<span class="token punctuation">,</span>
  <span class="token property">&quot;commonAnnotations&quot;</span><span class="token operator">:</span> &lt;object&gt;<span class="token punctuation">,</span>
  <span class="token property">&quot;externalURL&quot;</span><span class="token operator">:</span> &lt;string&gt;<span class="token punctuation">,</span>  <span class="token comment">// backlink to the Alertmanager.</span>
  <span class="token property">&quot;alerts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;labels&quot;</span><span class="token operator">:</span> &lt;object&gt;<span class="token punctuation">,</span>
      <span class="token property">&quot;annotations&quot;</span><span class="token operator">:</span> &lt;object&gt;<span class="token punctuation">,</span>
      <span class="token property">&quot;startsAt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;rfc3339&gt;&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;endsAt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;rfc3339&gt;&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用golang创建webhook服务" tabindex="-1"><a class="header-anchor" href="#使用golang创建webhook服务" aria-hidden="true">#</a> 使用Golang创建webhook服务</h3><p>首先我们尝试使用Golang创建用于接收webhook告警通知的服务。首先创建model包，用于映射ALertmanager发送的告警信息，Alertmanager的一个通知中根据配置的group_by规则可能会包含多条告警信息Alert。创建告警通知对应的结构体Notification。</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>package model

import &quot;time&quot;

type Alert struct {
	Labels      map[string]string \`json:&quot;labels&quot;\`
	Annotations map[string]string \`json:annotations\`
	StartsAt    time.Time         \`json:&quot;startsAt&quot;\`
	EndsAt      time.Time         \`json:&quot;endsAt&quot;\`
}

type Notification struct {
	Version           string            \`json:&quot;version&quot;\`
	GroupKey          string            \`json:&quot;groupKey&quot;\`
	Status            string            \`json:&quot;status&quot;\`
	Receiver          string            \`json:receiver\`
	GroupLabels       map[string]string \`json:groupLabels\`
	CommonLabels      map[string]string \`json:commonLabels\`
	CommonAnnotations map[string]string \`json:commonAnnotations\`
	ExternalURL       string            \`json:externalURL\`
	Alerts            []Alert           \`json:alerts\`
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用gin-gonic框架创建用于接收Webhook通知的Web服务。定义路由/webhook接收来自Alertmanager的POST请求。</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>package main

import (
	&quot;net/http&quot;

	&quot;github.com/gin-gonic/gin&quot;
	model &quot;github.com/yunlzheng/alertmanaer-dingtalk-webhook/model&quot;
)

func main() {
	router := gin.Default()
	router.POST(&quot;/webhook&quot;, func(c *gin.Context) {
		var notification model.Notification

		err := c.BindJSON(&amp;notification)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{&quot;error&quot;: err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{&quot;message&quot;: &quot; successful receive alert notification message!&quot;})

	})
	router.Run()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="与钉钉集成" tabindex="-1"><a class="header-anchor" href="#与钉钉集成" aria-hidden="true">#</a> 与钉钉集成</h3><p>钉钉，阿里巴巴出品，专为中国企业打造的免费智能移动办公平台，提供了即时通讯以及移动办公等丰富的功能。</p>`,16),b={href:"https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.8M9OKD&treeId=257&articleId=105733&docType=1",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/yunlzheng/alertmanaer-dingtalk-webhook",target:"_blank",rel:"noopener noreferrer"},k=a('<h5 id="自定义webhook群机器人" tabindex="-1"><a class="header-anchor" href="#自定义webhook群机器人" aria-hidden="true">#</a> 自定义webhook群机器人</h5><p>通过钉钉客户端（如：桌面或者手机）进入到群设置后选择“群机器人”。将显示如下界面：</p><figure><img src="'+d+'" alt="群机器人" tabindex="0" loading="lazy"><figcaption>群机器人</figcaption></figure><p>选择“自定义机器人”，并且按照提示填写机器人名称，获取机器人webhook地址，如下所示：</p><figure><img src="'+u+`" alt="获取webhook地址" tabindex="0" loading="lazy"><figcaption>获取webhook地址</figcaption></figure><p>webhook机器人创建成功后，用户就可以使用任何方式向该地址发起HTTP POST请求，即可实现向该群主发送消息。目前自定义机器人支持文本(text)，连接(link)，markdown三种消息类型。</p><p>例如，可以向webhook地址以POST形式发送以下</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
     <span class="token property">&quot;msgtype&quot;</span><span class="token operator">:</span> <span class="token string">&quot;markdown&quot;</span><span class="token punctuation">,</span>
     <span class="token property">&quot;markdown&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;Prometheus告警信息&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#### 监控指标\\n&quot;</span> +
                 <span class="token string">&quot;&gt; 监控描述信息\\n\\n&quot;</span> +
                 <span class="token string">&quot;&gt; ###### 告警时间 \\n&quot;</span>
     <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;at&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;atMobiles&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;156xxxx8827&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;189xxxx8325&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span> 
        <span class="token property">&quot;isAtAll&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用curl验证钉钉webhook是否能够成功调用：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ curl -l -H &quot;Content-type: application/json&quot; -X POST -d &#39;{&quot;msgtype&quot;: &quot;markdown&quot;,&quot;markdown&quot;: {&quot;title&quot;:&quot;Prometheus告警信息&quot;,&quot;text&quot;: &quot;#### 监控指标\\n&gt; 监控描述信息\\n\\n&gt; ###### 告警时间 \\n&quot;},&quot;at&quot;: {&quot;isAtAll&quot;: false}}&#39; https://oapi.dingtalk.com/robot/send?access_token=xxxx
{&quot;errcode&quot;:0,&quot;errmsg&quot;:&quot;ok&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>调用成功后，可以在钉钉应用群消息中接收到类似于如下通知消息:</p><figure><img src="`+c+`" alt="测试消息" tabindex="0" loading="lazy"><figcaption>测试消息</figcaption></figure><h5 id="定义转换器将告警通知转化为dingtalk消息对象" tabindex="-1"><a class="header-anchor" href="#定义转换器将告警通知转化为dingtalk消息对象" aria-hidden="true">#</a> 定义转换器将告警通知转化为Dingtalk消息对象</h5><p>这里定义结构体DingTalkMarkdown用于映射Dingtalk的消息体。</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>package model

type At struct {
	AtMobiles []string \`json:&quot;atMobiles&quot;\`
	IsAtAll   bool     \`json:&quot;isAtAll&quot;\`
}

type DingTalkMarkdown struct {
	MsgType  string    \`json:&quot;msgtype&quot;\`
	At       *At       \`json:at\`
	Markdown *Markdown \`json:&quot;markdown&quot;\`
}

type Markdown struct {
	Title string \`json:&quot;title&quot;\`
	Text  string \`json:&quot;text&quot;\`
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义转换器将Alertmanager发送的告警通知转换为Dingtalk的消息体。</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>package transformer

import (
	&quot;bytes&quot;
	&quot;fmt&quot;

	&quot;github.com/yunlzheng/alertmanaer-dingtalk-webhook/model&quot;
)

// TransformToMarkdown transform alertmanager notification to dingtalk markdow message
func TransformToMarkdown(notification model.Notification) (markdown *model.DingTalkMarkdown, err error) {

	groupKey := notification.GroupKey
	status := notification.Status

	annotations := notification.CommonAnnotations

	var buffer bytes.Buffer

	buffer.WriteString(fmt.Sprintf(&quot;### 通知组%s(当前状态:%s) \\n&quot;, groupKey, status))

	buffer.WriteString(fmt.Sprintf(&quot;#### 告警项:\\n&quot;))

	for _, alert := range notification.Alerts {
		annotations := alert.Annotations
		buffer.WriteString(fmt.Sprintf(&quot;##### %s\\n &gt; %s\\n&quot;, annotations[&quot;summary&quot;], annotations[&quot;description&quot;]))
		buffer.WriteString(fmt.Sprintf(&quot;\\n&gt; 开始时间：%s\\n&quot;, alert.StartsAt.Format(&quot;15:04:05&quot;)))
	}

	markdown = &amp;model.DingTalkMarkdown{
		MsgType: &quot;markdown&quot;,
		Markdown: &amp;model.Markdown{
			Title: fmt.Sprintf(&quot;通知组：%s(当前状态:%s)&quot;, groupKey, status),
			Text:  buffer.String(),
		},
		At: &amp;model.At{
			IsAtAll: false,
		},
	}

	return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="创建dingtalk通知发送包" tabindex="-1"><a class="header-anchor" href="#创建dingtalk通知发送包" aria-hidden="true">#</a> 创建Dingtalk通知发送包</h5><p>notifier包中使用golang的net/http包实现与Dingtalk群机器人的交互。Send方法包含两个参数：接收到的告警通知结构体指针，以及Dingtalk群机器人的Webhook地址。</p><p>通过包transformer.TransformToMarkdown将Alertmanager告警通知与Dingtalk消息进行映射。</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>package notifier

import (
	&quot;bytes&quot;
	&quot;encoding/json&quot;
	&quot;fmt&quot;
	&quot;net/http&quot;

	&quot;github.com/yunlzheng/alertmanaer-dingtalk-webhook/model&quot;
	&quot;github.com/yunlzheng/alertmanaer-dingtalk-webhook/transformer&quot;
)

func Send(notification model.Notification, dingtalkRobot string) (err error) {

	markdown, err := transformer.TransformToMarkdown(notification)

	if err != nil {
		return
	}

	data, err := json.Marshal(markdown)
	if err != nil {
		return
	}

	req, err := http.NewRequest(
		&quot;POST&quot;,
		dingtalkRobot,
		bytes.NewBuffer(data))

	if err != nil {
		return
	}

	req.Header.Set(&quot;Content-Type&quot;, &quot;application/json&quot;)
	client := &amp;http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		return
	}

	defer resp.Body.Close()
	fmt.Println(&quot;response Status:&quot;, resp.Status)
	fmt.Println(&quot;response Headers:&quot;, resp.Header)

	return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="扩展启动函数" tabindex="-1"><a class="header-anchor" href="#扩展启动函数" aria-hidden="true">#</a> 扩展启动函数</h5><p>首先为程序添加命令行参数支持，用于在启动时添加全局的Dingtalk群聊机器人地址。</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>package main

import (
  &quot;flag&quot;
  ...
  &quot;github.com/yunlzheng/alertmanaer-dingtalk-webhook/notifier&quot;
)

var (
	h            bool
	defaultRobot string
)

func init() {
	flag.BoolVar(&amp;h, &quot;h&quot;, false, &quot;help&quot;)
	flag.StringVar(&amp;defaultRobot, &quot;defaultRobot&quot;, &quot;&quot;, &quot;global dingtalk robot webhook&quot;)
}

func main() {

	flag.Parse()

	if h {
		flag.Usage()
		return
	}

  ...

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时通过notifier包的Send方法将告警通知发送给Dingtalk群聊机器人</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func main() {

  ...

  err = notifier.Send(notification, defaultRobot)

  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{&quot;error&quot;: err.Error()})

  }

  c.JSON(http.StatusOK, gin.H{&quot;message&quot;: &quot;send to dingtalk successful!&quot;})
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="使用dingtalk扩展" tabindex="-1"><a class="header-anchor" href="#使用dingtalk扩展" aria-hidden="true">#</a> 使用Dingtalk扩展</h5><p>运行并启动dingtalk webhook服务之后，修改Alertmanager配置文件, 为default-receiver添加webhook配置，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>receivers:
  - name: default-receiver
    email_configs:
      - to: yunl.zheng@wise2c.com
	webhook_configs:
	  - url: http://localhost:8080/webhook
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启Alertmanager服务后，手动拉高虚拟机CPU使用率触发告警条件，此时Dingtalk即可接收到相应的告警通知信息:</p><figure><img src="`+v+'" alt="钉钉群机器人告警信息" tabindex="0" loading="lazy"><figcaption>钉钉群机器人告警信息</figcaption></figure>',31);function q(h,f){const s=l("ExternalLinkIcon");return o(),r("div",null,[m,e("p",null,[e("a",b,[n("钉钉群机器人"),i(s)]),n("是钉钉群的高级扩展功能。群机器人可以将第三方服务的信息聚合到群聊中，实现自动化的信息同步。例如：通过聚合GitHub，GitLab等源码管理服务，实现源码更新同步；通过聚合Trello，JIRA等项目协调服务，实现项目信息同步。不仅如此，群机器人支持Webhook协议的自定义接入，支持更多可能性。这里我们将演示如果将Alertmanager运维报警提醒通过自定义机器人聚合到钉钉群。")]),e("p",null,[n("这里将继续扩展webhook服务，以支持将Alertmanager的告警通知转发到钉钉平台。完整的示例代码可以从github仓库"),e("a",g,[n("https://github.com/yunlzheng/alertmanaer-dingtalk-webhook"),i(s)]),n("中获取。")]),k])}const x=t(p,[["render",q],["__file","alert-manager-extension-with-webhook.html.vue"]]);export{x as default};
