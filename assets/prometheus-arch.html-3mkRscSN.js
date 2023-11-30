import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as r,c as t,d as o}from"./app-tU1o2vQf.js";const a="/prometheus-book/assets/prometheus_architecture-5LqsB0r1.png",s={},h=o('<h1 id="prometheus组件" tabindex="-1"><a class="header-anchor" href="#prometheus组件" aria-hidden="true">#</a> Prometheus组件</h1><p>上一小节，通过部署Node Exporter我们成功的获取到了当前主机的资源使用情况。接下来我们将从Prometheus的架构角度详细介绍Prometheus生态中的各个组件。</p><p>下图展示Prometheus的基本架构：</p><figure><img src="'+a+'" alt="Prometheus架构" tabindex="0" loading="lazy"><figcaption>Prometheus架构</figcaption></figure><h2 id="prometheus-server" tabindex="-1"><a class="header-anchor" href="#prometheus-server" aria-hidden="true">#</a> Prometheus Server</h2><p>Prometheus Server是Prometheus组件中的核心部分，负责实现对监控数据的获取，存储以及查询。 Prometheus Server可以通过静态配置管理监控目标，也可以配合使用Service Discovery的方式动态管理监控目标，并从这些监控目标中获取数据。其次Prometheus Server需要对采集到的监控数据进行存储，Prometheus Server本身就是一个时序数据库，将采集到的监控数据按照时间序列的方式存储在本地磁盘当中。最后Prometheus Server对外提供了自定义的PromQL语言，实现对数据的查询以及分析。</p><p>Prometheus Server内置的Express Browser UI，通过这个UI可以直接通过PromQL实现数据的查询以及可视化。</p><p>Prometheus Server的联邦集群能力可以使其从其他的Prometheus Server实例中获取数据，因此在大规模监控的情况下，可以通过联邦集群以及功能分区的方式对Prometheus Server进行扩展。</p><h2 id="exporters" tabindex="-1"><a class="header-anchor" href="#exporters" aria-hidden="true">#</a> Exporters</h2><p>Exporter将监控数据采集的端点通过HTTP服务的形式暴露给Prometheus Server，Prometheus Server通过访问该Exporter提供的Endpoint端点，即可获取到需要采集的监控数据。</p><p>一般来说可以将Exporter分为2类：</p><ul><li>直接采集：这一类Exporter直接内置了对Prometheus监控的支持，比如cAdvisor，Kubernetes，Etcd，Gokit等，都直接内置了用于向Prometheus暴露监控数据的端点。</li><li>间接采集：间接采集，原有监控目标并不直接支持Prometheus，因此我们需要通过Prometheus提供的Client Library编写该监控目标的监控采集程序。例如： Mysql Exporter，JMX Exporter，Consul Exporter等。</li></ul><h2 id="alertmanager" tabindex="-1"><a class="header-anchor" href="#alertmanager" aria-hidden="true">#</a> AlertManager</h2><p>在Prometheus Server中支持基于PromQL创建告警规则，如果满足PromQL定义的规则，则会产生一条告警，而告警的后续处理流程则由AlertManager进行管理。在AlertManager中我们可以与邮件，Slack等等内置的通知方式进行集成，也可以通过Webhook自定义告警处理方式。AlertManager即Prometheus体系中的告警处理中心。</p><h2 id="pushgateway" tabindex="-1"><a class="header-anchor" href="#pushgateway" aria-hidden="true">#</a> PushGateway</h2><p>由于Prometheus数据采集基于Pull模型进行设计，因此在网络环境的配置上必须要让Prometheus Server能够直接与Exporter进行通信。 当这种网络需求无法直接满足时，就可以利用PushGateway来进行中转。可以通过PushGateway将内部网络的监控数据主动Push到Gateway当中。而Prometheus Server则可以采用同样Pull的方式从PushGateway中获取到监控数据。</p>',16),u=[h];function m(i,p){return r(),t("div",null,u)}const P=e(s,[["render",m],["__file","prometheus-arch.html.vue"]]);export{P as default};