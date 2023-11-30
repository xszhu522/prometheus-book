import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as l,c as t,a as e,b as n,e as o,d as u}from"./app-d7bHIUBF.js";const a="/prometheus-book/assets/consul_ui_page-4W4ANgAn.png",r={},v=e("h1",{id:"基于consul的服务发现",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#基于consul的服务发现","aria-hidden":"true"},"#"),n(" 基于Consul的服务发现")],-1),c=e("p",null,"Consul是由HashiCorp开发的一个支持多数据中心的分布式服务发现和键值对存储服务的开源软件，被大量应用于基于微服务的软件架构当中。",-1),m=e("h2",{id:"consul初体验",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#consul初体验","aria-hidden":"true"},"#"),n(" Consul初体验")],-1),b={href:"https://www.consul.io/downloads.html",target:"_blank",rel:"noopener noreferrer"},q=u(`<p>在本地可以使用开发者模式在本地快速启动一个单节点的Consul环境：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ consul agent -dev
==&gt; Starting Consul agent...
==&gt; Consul agent running!
           Version: &#39;v1.0.7&#39;
           Node ID: &#39;d7b590ba-e2f8-3a82-e8a8-2a911bdf67d5&#39;
         Node name: &#39;localhost&#39;
        Datacenter: &#39;dc1&#39; (Segment: &#39;&lt;all&gt;&#39;)
            Server: true (Bootstrap: false)
       Client Addr: [127.0.0.1] (HTTP: 8500, HTTPS: -1, DNS: 8600)
      Cluster Addr: 127.0.0.1 (LAN: 8301, WAN: 8302)
           Encrypt: Gossip: false, TLS-Outgoing: false, TLS-Incoming: false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在启动成功后，在一个新的terminal窗口中运行consul members可以查看当前集群中的所有节点：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ consul members
Node       Address         Status  Type    Build  Protocol  DC   Segment
localhost  127.0.0.1:8301  alive   server  1.0.7  2         dc1  &lt;all&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户还可以通过HTTP API的方式查看当前集群中的节点信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ curl localhost:8500/v1/catalog/nodes
[
    {
        &quot;ID&quot;: &quot;d7b590ba-e2f8-3a82-e8a8-2a911bdf67d5&quot;,
        &quot;Node&quot;: &quot;localhost&quot;,
        &quot;Address&quot;: &quot;127.0.0.1&quot;,
        &quot;Datacenter&quot;: &quot;dc1&quot;,
        &quot;TaggedAddresses&quot;: {
            &quot;lan&quot;: &quot;127.0.0.1&quot;,
            &quot;wan&quot;: &quot;127.0.0.1&quot;
        },
        &quot;Meta&quot;: {
            &quot;consul-network-segment&quot;: &quot;&quot;
        },
        &quot;CreateIndex&quot;: 5,
        &quot;ModifyIndex&quot;: 6
    }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Consul还提供了内置的DNS服务，可以通过Consul的DNS服务的方式访问其中的节点：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ dig @127.0.0.1 -p 8600 localhost.node.consul

; &lt;&lt;&gt;&gt; DiG 9.9.7-P3 &lt;&lt;&gt;&gt; @127.0.0.1 -p 8600 localhost.node.consul
; (1 server found)
;; global options: +cmd
;; Got answer:
;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 50684
;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
;; WARNING: recursion requested but not available

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;localhost.node.consul.		IN	A

;; ANSWER SECTION:
localhost.node.consul.	0	IN	A	127.0.0.1

;; Query time: 5 msec
;; SERVER: 127.0.0.1#8600(127.0.0.1)
;; WHEN: Sun Apr 15 22:10:56 CST 2018
;; MSG SIZE  rcvd: 66
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Consul当中服务可以通过服务定义文件或者是HTTP API的方式进行注册。这里使用服务定义文件的方式将本地运行的node_exporter通过服务的方式注册到Consul当中。</p><p>创建配置目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo mkdir /etc/consul.d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo &#39;{&quot;service&quot;: {&quot;name&quot;: &quot;node_exporter&quot;, &quot;tags&quot;: [&quot;exporter&quot;], &quot;port&quot;: 9100}}&#39; \\
    | sudo tee /etc/consul.d/node_exporter.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动Consul服务，并且声明服务定义文件所在目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ consul agent -dev -config-dir=/etc/consul.d
==&gt; Starting Consul agent...
    2018/04/15 22:23:47 [DEBUG] agent: Service &quot;node_exporter&quot; in sync
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦服务注册成功之后，用户就可以通过DNS或HTTP API的方式查询服务信息。默认情况下，所有的服务都可以使用NAME.service.consul域名的方式进行访问。</p><p>例如，可以使用node_exporter.service.consul域名查询node_exporter服务的信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ dig @127.0.0.1 -p 8600 node_exporter.service.consul

;; QUESTION SECTION:
;node_exporter.service.consul.	IN	A

;; ANSWER SECTION:
node_exporter.service.consul. 0	IN	A	127.0.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示DNS记录会返回当前可用的node_exporter服务实例的IP地址信息。</p><p>除了使用DNS的方式以外，Consul还支持用户使用HTTP API的形式获取服务列表：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ curl http://localhost:8500/v1/catalog/service/node_exporter
[
    {
        &quot;ID&quot;: &quot;e561b376-2c1b-653d-61a0-1d844bce06a7&quot;,
        &quot;Node&quot;: &quot;localhost&quot;,
        &quot;Address&quot;: &quot;127.0.0.1&quot;,
        &quot;Datacenter&quot;: &quot;dc1&quot;,
        &quot;TaggedAddresses&quot;: {
            &quot;lan&quot;: &quot;127.0.0.1&quot;,
            &quot;wan&quot;: &quot;127.0.0.1&quot;
        },
        &quot;NodeMeta&quot;: {
            &quot;consul-network-segment&quot;: &quot;&quot;
        },
        &quot;ServiceID&quot;: &quot;node_exporter&quot;,
        &quot;ServiceName&quot;: &quot;node_exporter&quot;,
        &quot;ServiceTags&quot;: [
            &quot;exporter&quot;
        ],
        &quot;ServiceAddress&quot;: &quot;&quot;,
        &quot;ServiceMeta&quot;: {},
        &quot;ServicePort&quot;: 9100,
        &quot;ServiceEnableTagOverride&quot;: false,
        &quot;CreateIndex&quot;: 6,
        &quot;ModifyIndex&quot;: 6
    }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Consul也提供了一个Web UI可以查看Consul中所有服务以及节点的状态：</p><figure><img src="`+a+`" alt="Consul UI" tabindex="0" loading="lazy"><figcaption>Consul UI</figcaption></figure><p>当然Consul还提供了更多的API用于支持对服务的生命周期管理（添加、删除、修改等）这里就不做过多的介绍，感兴趣的同学可以通过Consul官方文档了解更多的详细信息。</p><h2 id="与prometheus集成" tabindex="-1"><a class="header-anchor" href="#与prometheus集成" aria-hidden="true">#</a> 与Prometheus集成</h2><p>Consul作为一个通用的服务发现和注册中心，记录并且管理了环境中所有服务的信息。Prometheus通过与Consul的交互可以获取到相应Exporter实例的访问信息。在Prometheus的配置文件当可以通过以下方式与Consul进行集成：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- job_name: node_exporter
    metrics_path: /metrics
    scheme: http
    consul_sd_configs:
      - server: localhost:8500
        services:
          - node_exporter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在consul_sd_configs定义当中通过server定义了Consul服务的访问地址，services则定义了当前需要发现哪些类型服务实例的信息，这里限定了只获取node_exporter的服务实例信息。</p>`,27);function p(g,x){const i=d("ExternalLinkIcon");return l(),t("div",null,[v,c,m,e("p",null,[n("用户可以通过Consul官网"),e("a",b,[n("https://www.consul.io/downloads.html"),o(i)]),n("下载对应操作系统版本的软件包。Consul与Prometheus同样使用Go语言进行开发，因此安装和部署的方式也极为简单，解压并将命令行工具放到系统PATH路径下即可。")]),q])}const N=s(r,[["render",p],["__file","service-discovery-with-consul.html.vue"]]);export{N as default};
