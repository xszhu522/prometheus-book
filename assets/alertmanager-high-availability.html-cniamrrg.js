import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as l,c as r,a,b as e,e as d,d as i}from"./app-NWC4HiYT.js";const o="/prometheus-book/assets/prom-ha-with-single-am-XRMYNRD8.png",u="/prometheus-book/assets/alertmanager-features-tUu3yzdC.png",m="/prometheus-book/assets/prom-ha-with-double-am-WL-BS50T.png",c="/prometheus-book/assets/prom-ha-with-am-gossip-bUvYIkEA.png",v="/prometheus-book/assets/gossip-protoctl-8kcSkoMB.png",g="/prometheus-book/assets/am-notifi-pipeline-4GXXiHve.png",p="/prometheus-book/assets/am-gossip-WKygMtEC.png",b="/prometheus-book/assets/alertmanager-gossip-ha-5nXRiqT4.png",h="/prometheus-book/assets/am-ha-status-wSpzn9f3.png",q="/prometheus-book/assets/promethues-alertmanager-ha-X-EPQ2Ys.png",f={},x=i('<h1 id="alertmanager高可用" tabindex="-1"><a class="header-anchor" href="#alertmanager高可用" aria-hidden="true">#</a> Alertmanager高可用</h1><p>在上一小节中我们主要讨论了Prometheus Server自身的高可用问题。而接下来，重点将放在告警处理也就是Alertmanager部分。如下所示。</p><figure><img src="'+o+'" alt="Alertmanager成为单点" tabindex="0" loading="lazy"><figcaption>Alertmanager成为单点</figcaption></figure><p>为了提升Prometheus的服务可用性，通常用户会部署两个或者两个以上的Promthus Server，它们具有完全相同的配置包括Job配置，以及告警配置等。当某一个Prometheus Server发生故障后可以确保Prometheus持续可用。</p><p>同时基于Alertmanager的告警分组机制即使不同的Prometheus Sever分别发送相同的告警给Alertmanager，Alertmanager也可以自动将这些告警合并为一个通知向receiver发送。</p><figure><img src="'+u+'" alt="Alertmanager特性" tabindex="0" loading="lazy"><figcaption>Alertmanager特性</figcaption></figure><p>但不幸的是，虽然Alertmanager能够同时处理多个相同的Prometheus Server所产生的告警。但是由于单个Alertmanager的存在，当前的部署结构存在明显的单点故障风险，当Alertmanager单点失效后，告警的后续所有业务全部失效。</p><p>如下所示，最直接的方式，就是尝试部署多套Alertmanager。但是由于Alertmanager之间不存在并不了解彼此的存在，因此则会出现告警通知被不同的Alertmanager重复发送多次的问题。</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为了解决这一问题，如下所示。Alertmanager引入了Gossip机制。Gossip机制为多个Alertmanager之间提供了信息传递的机制。确保及时在多个Alertmanager分别接收到相同告警信息的情况下，也只有一个告警通知被发送给Receiver。</p><figure><img src="'+c+'" alt="Alertmanager Gossip" tabindex="0" loading="lazy"><figcaption>Alertmanager Gossip</figcaption></figure><h2 id="gossip协议" tabindex="-1"><a class="header-anchor" href="#gossip协议" aria-hidden="true">#</a> Gossip协议</h2><p>Gossip是分布式系统中被广泛使用的协议，用于实现分布式节点之间的信息交换和状态同步。Gossip协议同步状态类似于流言或者病毒的传播，如下所示：</p><figure><img src="'+v+'" alt="Gossip分布式协议" tabindex="0" loading="lazy"><figcaption>Gossip分布式协议</figcaption></figure><p>一般来说Gossip有两种实现方式分别为Push-based和Pull-based。在Push-based当集群中某一节点A完成一个工作后，随机的从其它节点B并向其发送相应的消息，节点B接收到消息后在重复完成相同的工作，直到传播到集群中的所有节点。而Pull-based的实现中节点A会随机的向节点B发起询问是否有新的状态需要同步，如果有则返回。</p><p>在简单了解了Gossip协议之后，我们来看Alertmanager是如何基于Gossip协议实现集群高可用的。如下所示，当Alertmanager接收到来自Prometheus的告警消息后，会按照以下流程对告警进行处理：</p><figure><img src="'+g+'" alt="通知流水线" tabindex="0" loading="lazy"><figcaption>通知流水线</figcaption></figure><ol><li>在第一个阶段Silence中，Alertmanager会判断当前通知是否匹配到任何的静默规则，如果没有则进入下一个阶段，否则中断流水线不发送通知。</li><li>在第二个阶段Wait中，Alertmanager会根据当前Alertmanager在集群中所在的顺序(index)等待index * 5s的时间。</li><li>当前Alertmanager等待阶段结束后，Dedup阶段则会判断当前Alertmanager数据库中该通知是否已经发送，如果已经发送则中断流水线，不发送告警，否则进入下一阶段Send对外发送告警通知。</li><li>告警发送完成后该Alertmanager进入最后一个阶段Gossip，Gossip会通知其他Alertmanager实例当前告警已经发送。其他实例接收到Gossip消息后，则会在自己的数据库中保存该通知已发送的记录。</li></ol><p>因此如下所示，Gossip机制的关键在于两点：</p><figure><img src="'+p+`" alt="Gossip机制" tabindex="0" loading="lazy"><figcaption>Gossip机制</figcaption></figure><ul><li>Silence设置同步：Alertmanager启动阶段基于Pull-based从集群其它节点同步Silence状态，当有新的Silence产生时使用Push-based方式在集群中传播Gossip信息。</li><li>通知发送状态同步：告警通知发送完成后，基于Push-based同步告警发送状态。Wait阶段可以确保集群状态一致。</li></ul><p>Alertmanager基于Gossip实现的集群机制虽然不能保证所有实例上的数据时刻保持一致，但是实现了CAP理论中的AP系统，即可用性和分区容错性。同时对于Prometheus Server而言保持了配置了简单性，Prometheus Server之间不需要任何的状态同步。</p><h2 id="搭建本地集群环境" tabindex="-1"><a class="header-anchor" href="#搭建本地集群环境" aria-hidden="true">#</a> 搭建本地集群环境</h2><p>为了能够让Alertmanager节点之间进行通讯，需要在Alertmanager启动时设置相应的参数。其中主要的参数包括：</p><ul><li>--cluster.listen-address string: 当前实例集群服务监听地址</li><li>--cluster.peer value: 初始化时关联的其它实例的集群服务地址</li></ul><p>例如：</p><p>定义Alertmanager实例a1，其中Alertmanager的服务运行在9093端口，集群服务地址运行在8001端口。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alertmanager  --web.listen-address=&quot;:9093&quot; --cluster.listen-address=&quot;127.0.0.1:8001&quot; --config.file=/etc/prometheus/alertmanager.yml  --storage.path=/data/alertmanager/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>定义Alertmanager实例a2，其中主服务运行在9094端口，集群服务运行在8002端口。为了将a1，a2组成集群。 a2启动时需要定义--cluster.peer参数并且指向a1实例的集群服务地址:8001。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alertmanager  --web.listen-address=&quot;:9094&quot; --cluster.listen-address=&quot;127.0.0.1:8002&quot; --cluster.peer=127.0.0.1:8001 --config.file=/etc/prometheus/alertmanager.yml  --storage.path=/data/alertmanager2/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了能够在本地模拟集群环境，这里使用了一个轻量级的多线程管理工具goreman。使用以下命令可以在本地安装goreman命令行工具。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get github.com/mattn/goreman
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建alertmanager集群" tabindex="-1"><a class="header-anchor" href="#创建alertmanager集群" aria-hidden="true">#</a> 创建Alertmanager集群</h3><p>创建Alertmanager配置文件/etc/prometheus/alertmanager-ha.yml, 为了验证Alertmanager的集群行为，这里在本地启动一个webhook服务用于打印Alertmanager发送的告警通知信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>route:
  receiver: &#39;default-receiver&#39;
receivers:
  - name: default-receiver
    webhook_configs:
    - url: &#39;http://127.0.0.1:5001/&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地webhook服务可以直接从Github获取。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 获取alertmanager提供的webhook示例，如果该目录下定义了main函数，go get会自动将其编译成可执行文件
go get github.com/prometheus/alertmanager/examples/webhook
# 设置环境变量指向GOPATH的bin目录
export PATH=$GOPATH/bin:$PATH
# 启动服务
webhook
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例结构如下所示：</p><figure><img src="`+b+`" alt="Alertmanager HA部署结构" tabindex="0" loading="lazy"><figcaption>Alertmanager HA部署结构</figcaption></figure><p>创建alertmanager.procfile文件，并且定义了三个Alertmanager节点（a1，a2，a3）以及用于接收告警通知的webhook服务:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a1: alertmanager  --web.listen-address=&quot;:9093&quot; --cluster.listen-address=&quot;127.0.0.1:8001&quot; --config.file=/etc/prometheus/alertmanager-ha.yml  --storage.path=/data/alertmanager/ --log.level=debug
a2: alertmanager  --web.listen-address=&quot;:9094&quot; --cluster.listen-address=&quot;127.0.0.1:8002&quot; --cluster.peer=127.0.0.1:8001 --config.file=/etc/prometheus/alertmanager-ha.yml  --storage.path=/data/alertmanager2/ --log.level=debug
a3: alertmanager  --web.listen-address=&quot;:9095&quot; --cluster.listen-address=&quot;127.0.0.1:8003&quot; --cluster.peer=127.0.0.1:8001 --config.file=/etc/prometheus/alertmanager-ha.yml  --storage.path=/data/alertmanager2/ --log.level=debug

webhook: webhook
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Procfile文件所在目录，执行goreman start命令，启动所有进程:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ goreman -f alertmanager.procfile start
10:27:57      a1 | level=debug ts=2018-03-12T02:27:57.399166371Z caller=cluster.go:125 component=cluster msg=&quot;joined cluster&quot; peers=0
10:27:57      a3 | level=info ts=2018-03-12T02:27:57.40004678Z caller=main.go:346 msg=Listening address=:9095
10:27:57      a1 | level=info ts=2018-03-12T02:27:57.400212246Z caller=main.go:271 msg=&quot;Loading configuration file&quot; file=/etc/prometheus/alertmanager.yml
10:27:57      a1 | level=info ts=2018-03-12T02:27:57.405638714Z caller=main.go:346 msg=Listening address=:9093
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43),A={href:"http://localhost:9093/#/status",target:"_blank",rel:"noopener noreferrer"},_=i('<figure><img src="'+h+`" alt="Alertmanager集群状态" tabindex="0" loading="lazy"><figcaption>Alertmanager集群状态</figcaption></figure><p>当集群中的Alertmanager节点不在一台主机时，通常需要使用--cluster.advertise-address参数指定当前节点所在网络地址。</p><blockquote><p>注意：由于goreman不保证进程之间的启动顺序，如果集群状态未达到预期，可以使用<code>goreman -f alertmanager.procfile run restart a2</code>重启a2，a3服务。</p></blockquote><p>当Alertmanager集群启动完成后，可以使用send-alerts.sh脚本对集群进行简单测试，这里利用curl分别向3个Alertmanager实例发送告警信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alerts1=&#39;[
  {
    &quot;labels&quot;: {
       &quot;alertname&quot;: &quot;DiskRunningFull&quot;,
       &quot;dev&quot;: &quot;sda1&quot;,
       &quot;instance&quot;: &quot;example1&quot;
     },
     &quot;annotations&quot;: {
        &quot;info&quot;: &quot;The disk sda1 is running full&quot;,
        &quot;summary&quot;: &quot;please check the instance example1&quot;
      }
  },
  {
    &quot;labels&quot;: {
       &quot;alertname&quot;: &quot;DiskRunningFull&quot;,
       &quot;dev&quot;: &quot;sdb2&quot;,
       &quot;instance&quot;: &quot;example2&quot;
     },
     &quot;annotations&quot;: {
        &quot;info&quot;: &quot;The disk sdb2 is running full&quot;,
        &quot;summary&quot;: &quot;please check the instance example2&quot;
      }
  },
  {
    &quot;labels&quot;: {
       &quot;alertname&quot;: &quot;DiskRunningFull&quot;,
       &quot;dev&quot;: &quot;sda1&quot;,
       &quot;instance&quot;: &quot;example3&quot;,
       &quot;severity&quot;: &quot;critical&quot;
     }
  },
  {
    &quot;labels&quot;: {
       &quot;alertname&quot;: &quot;DiskRunningFull&quot;,
       &quot;dev&quot;: &quot;sda1&quot;,
       &quot;instance&quot;: &quot;example3&quot;,
       &quot;severity&quot;: &quot;warning&quot;
     }
  }
]&#39;

curl -XPOST -d&quot;$alerts1&quot; http://localhost:9093/api/v1/alerts
curl -XPOST -d&quot;$alerts1&quot; http://localhost:9094/api/v1/alerts
curl -XPOST -d&quot;$alerts1&quot; http://localhost:9095/api/v1/alerts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行send-alerts.sh后，查看alertmanager日志，可以看到以下输出，3个Alertmanager实例分别接收到模拟的告警信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10:43:36      a1 | level=debug ts=2018-03-12T02:43:36.853370185Z caller=dispatch.go:188 component=dispatcher msg=&quot;Received alert&quot; alert=DiskRunningFull[6543bc1][active]
10:43:36      a2 | level=debug ts=2018-03-12T02:43:36.871180749Z caller=dispatch.go:188 component=dispatcher msg=&quot;Received alert&quot; alert=DiskRunningFull[8320f0a][active]
10:43:36      a3 | level=debug ts=2018-03-12T02:43:36.894923811Z caller=dispatch.go:188 component=dispatcher msg=&quot;Received alert&quot; alert=DiskRunningFull[8320f0a][active]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看webhook日志只接收到一个告警通知：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10:44:06 webhook | 2018/03/12 10:44:06 {
10:44:06 webhook |  &gt;  &quot;receiver&quot;: &quot;default-receiver&quot;,
10:44:06 webhook |  &gt;  &quot;status&quot;: &quot;firing&quot;,
10:44:06 webhook |  &gt;  &quot;alerts&quot;: [
10:44:06 webhook |  &gt;    {
10:44:06 webhook |  &gt;      &quot;status&quot;: &quot;firing&quot;,
10:44:06 webhook |  &gt;      &quot;labels&quot;: {
10:44:06 webhook |  &gt;        &quot;alertname&quot;: &quot;DiskRunningFull&quot;,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多实例prometheus与alertmanager集群" tabindex="-1"><a class="header-anchor" href="#多实例prometheus与alertmanager集群" aria-hidden="true">#</a> 多实例Prometheus与Alertmanager集群</h3><p>由于Gossip机制的实现，在Prometheus和Alertmanager实例之间不要使用任何的负载均衡，需要确保Prometheus将告警发送到所有的Alertmanager实例中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - 127.0.0.1:9093
      - 127.0.0.1:9094
      - 127.0.0.1:9095
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建Prometheus集群配置文件/etc/prometheus/prometheus-ha.yml，完整内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  scrape_interval: 15s
  scrape_timeout: 10s
  evaluation_interval: 15s
rule_files:
  - /etc/prometheus/rules/*.rules
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - 127.0.0.1:9093
      - 127.0.0.1:9094
      - 127.0.0.1:9095
scrape_configs:
- job_name: prometheus
  static_configs:
  - targets:
    - localhost:9090
- job_name: &#39;node&#39;
  static_configs:
  - targets: [&#39;localhost:9100&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时定义告警规则文件/etc/prometheus/rules/hoststats-alert.rules，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>groups:
- name: hostStatsAlert
  rules:
  - alert: hostCpuUsageAlert
    expr: sum(avg without (cpu)(irate(node_cpu{mode!=&#39;idle&#39;}[5m]))) by (instance) * 100 &gt; 50
    for: 1m
    labels:
      severity: page
    annotations:
      summary: &quot;Instance {{ $labels.instance }} CPU usgae high&quot;
      description: &quot;{{ $labels.instance }} CPU usage above 50% (current value: {{ $value }})&quot;
  - alert: hostMemUsageAlert
    expr: (node_memory_MemTotal - node_memory_MemAvailable)/node_memory_MemTotal * 100 &gt; 85
    for: 1m
    labels:
      severity: page
    annotations:
      summary: &quot;Instance {{ $labels.instance }} MEM usgae high&quot;
      description: &quot;{{ $labels.instance }} MEM usage above 85% (current value: {{ $value }})&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本示例部署结构如下所示：</p><figure><img src="`+q+`" alt="Prometheus与Alertmanager HA部署结构" tabindex="0" loading="lazy"><figcaption>Prometheus与Alertmanager HA部署结构</figcaption></figure><p>创建prometheus.procfile文件，创建两个Prometheus节点，分别监听9090和9091端口:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p1: prometheus --config.file=/etc/prometheus/prometheus-ha.yml --storage.tsdb.path=/data/prometheus/ --web.listen-address=&quot;127.0.0.1:9090&quot;
p2: prometheus --config.file=/etc/prometheus/prometheus-ha.yml --storage.tsdb.path=/data/prometheus2/ --web.listen-address=&quot;127.0.0.1:9091&quot;

node_exporter: node_exporter -web.listen-address=&quot;0.0.0.0:9100&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用goreman启动多节点Prometheus：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goreman -f prometheus.procfile -p 8556 start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Prometheus启动完成后，手动拉高系统CPU使用率：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat /dev/zero&gt;/dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>注意，对于多核主机，如果CPU达不到预期，运行多个命令。</p></blockquote><p>当CPU利用率达到告警规则触发条件，两个Prometheus实例告警分别被触发。查看Alertmanager输出日志：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>11:14:41      a3 | level=debug ts=2018-03-12T03:14:41.945493505Z caller=dispatch.go:188 component=dispatcher msg=&quot;Received alert&quot; alert=hostCpuUsageAlert[7d698ac][active]
11:14:41      a1 | level=debug ts=2018-03-12T03:14:41.945534548Z caller=dispatch.go:188 component=dispatcher msg=&quot;Received alert&quot; alert=hostCpuUsageAlert[7d698ac][active]
11:14:41      a2 | level=debug ts=2018-03-12T03:14:41.945687812Z caller=dispatch.go:188 component=dispatcher msg=&quot;Received alert&quot; alert=hostCpuUsageAlert[7d698ac][active]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3个Alertmanager实例分别接收到来自不同Prometheus实例的告警信息。而Webhook服务只接收到来自Alertmanager集群的一条告警通知：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>11:15:11 webhook | 2018/03/12 11:15:11 {
11:15:11 webhook |  &gt;  &quot;receiver&quot;: &quot;default-receiver&quot;,
11:15:11 webhook |  &gt;  &quot;status&quot;: &quot;firing&quot;,
11:15:11 webhook |  &gt;  &quot;alerts&quot;: [
11:15:11 webhook |  &gt;    {
11:15:11 webhook |  &gt;      &quot;status&quot;: &quot;firing&quot;,
11:15:11 webhook |  &gt;      &quot;labels&quot;: {
11:15:11 webhook |  &gt;        &quot;alertname&quot;: &quot;hostCpuUsageAlert&quot;,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29);function k(P,w){const n=s("ExternalLinkIcon");return l(),r("div",null,[x,a("p",null,[e("启动完成后访问任意Alertmanager节点"),a("a",A,[e("http://localhost:9093/#/status"),d(n)]),e(",可以查看当前Alertmanager集群的状态。")]),_])}const T=t(f,[["render",k],["__file","alertmanager-high-availability.html.vue"]]);export{T as default};
