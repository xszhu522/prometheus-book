import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as r,c as a,d as t}from"./app-tU1o2vQf.js";const o="/prometheus-book/assets/prometheus-alert-artich-YHVGi-YO.png",n="/prometheus-book/assets/alertmanager-features-tUu3yzdC.png",i={},h=t('<h1 id="prometheus告警简介" tabindex="-1"><a class="header-anchor" href="#prometheus告警简介" aria-hidden="true">#</a> Prometheus告警简介</h1><p>告警能力在Prometheus的架构中被划分成两个独立的部分。如下所示，通过在Prometheus中定义AlertRule（告警规则），Prometheus会周期性的对告警规则进行计算，如果满足告警触发条件就会向Alertmanager发送告警信息。</p><figure><img src="'+o+'" alt="Prometheus告警处理" tabindex="0" loading="lazy"><figcaption>Prometheus告警处理</figcaption></figure><p>在Prometheus中一条告警规则主要由以下几部分组成：</p><ul><li>告警名称：用户需要为告警规则命名，当然对于命名而言，需要能够直接表达出该告警的主要内容</li><li>告警规则：告警规则实际上主要由PromQL进行定义，其实际意义是当表达式（PromQL）查询结果持续多长时间（During）后出发告警</li></ul><p>在Prometheus中，还可以通过Group（告警组）对一组相关的告警进行统一定义。当然这些定义都是通过YAML文件来统一管理的。</p><p>Alertmanager作为一个独立的组件，负责接收并处理来自Prometheus Server(也可以是其它的客户端程序)的告警信息。Alertmanager可以对这些告警信息进行进一步的处理，比如当接收到大量重复告警时能够消除重复的告警信息，同时对告警信息进行分组并且路由到正确的通知方，Prometheus内置了对邮件，Slack等多种通知方式的支持，同时还支持与Webhook的集成，以支持更多定制化的场景。例如，目前Alertmanager还不支持钉钉，那用户完全可以通过Webhook与钉钉机器人进行集成，从而通过钉钉接收告警信息。同时AlertManager还提供了静默和告警抑制机制来对告警通知行为进行优化。</p><h2 id="alertmanager特性" tabindex="-1"><a class="header-anchor" href="#alertmanager特性" aria-hidden="true">#</a> Alertmanager特性</h2><p>Alertmanager除了提供基本的告警通知能力以外，还主要提供了如：分组、抑制以及静默等告警特性：</p><figure><img src="'+n+'" alt="Alertmanager特性" tabindex="0" loading="lazy"><figcaption>Alertmanager特性</figcaption></figure><h4 id="分组" tabindex="-1"><a class="header-anchor" href="#分组" aria-hidden="true">#</a> 分组</h4><p>分组机制可以将详细的告警信息合并成一个通知。在某些情况下，比如由于系统宕机导致大量的告警被同时触发，在这种情况下分组机制可以将这些被触发的告警合并为一个告警通知，避免一次性接受大量的告警通知，而无法对问题进行快速定位。</p><p>例如，当集群中有数百个正在运行的服务实例，并且为每一个实例设置了告警规则。假如此时发生了网络故障，可能导致大量的服务实例无法连接到数据库，结果就会有数百个告警被发送到Alertmanager。</p><p>而作为用户，可能只希望能够在一个通知中就能查看哪些服务实例受到影响。这时可以按照服务所在集群或者告警名称对告警进行分组，而将这些告警内聚在一起成为一个通知。</p><p>告警分组，告警时间，以及告警的接受方式可以通过Alertmanager的配置文件进行配置。</p><h4 id="抑制" tabindex="-1"><a class="header-anchor" href="#抑制" aria-hidden="true">#</a> 抑制</h4><p>抑制是指当某一告警发出后，可以停止重复发送由此告警引发的其它告警的机制。</p><p>例如，当集群不可访问时触发了一次告警，通过配置Alertmanager可以忽略与该集群有关的其它所有告警。这样可以避免接收到大量与实际问题无关的告警通知。</p><p>抑制机制同样通过Alertmanager的配置文件进行设置。</p><h4 id="静默" tabindex="-1"><a class="header-anchor" href="#静默" aria-hidden="true">#</a> 静默</h4><p>静默提供了一个简单的机制可以快速根据标签对告警进行静默处理。如果接收到的告警符合静默的配置，Alertmanager则不会发送告警通知。</p><p>静默设置需要在Alertmanager的Web页面上进行设置。</p>',22),s=[h];function l(m,p){return r(),a("div",null,s)}const c=e(i,[["render",l],["__file","prometheus-alert-manager-overview.html.vue"]]);export{c as default};