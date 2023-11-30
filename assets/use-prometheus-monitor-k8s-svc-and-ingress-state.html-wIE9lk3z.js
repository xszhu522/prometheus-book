import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as i,d as s}from"./app-NWC4HiYT.js";const l={},r=s(`<h1 id="监控service和ingress可用性" tabindex="-1"><a class="header-anchor" href="#监控service和ingress可用性" aria-hidden="true">#</a> 监控Service和Ingress可用性</h1><p>在第4章中我们介绍了如何基于Blackbox Exporter进行黑盒监控，黑盒监控侧重于从用户角度来测试服务的可用性。当用户在Kubernetes中部署应用程序时，为了能让程序之间能够相互访问，需要使用到Service。而如果，需要让Kubernetes集群外的用户能够访问访问集群内的应用，则需要使用到Ingress。</p><p>Ingress和Service均扮演了负载均衡的角色，通过网络探针对Ingress和Service对应的服务进行监控，能够快速判断当前服务的可用性，并且在发生故障时能够即使的做出响应。</p><h2 id="在kubernetes下部署blackbox-exporter" tabindex="-1"><a class="header-anchor" href="#在kubernetes下部署blackbox-exporter" aria-hidden="true">#</a> 在Kubernetes下部署Blackbox Exporter</h2><p>如下所示，通过Deployment定义了一个单实例的Blackbox-exporter实例，并且为其定义了相应的Service。通过Service暴露的DNS地址，集群内的Prometheus能够非常简单的通过域名：blackbox-exporter.default.svc.cluster.local访问到Blackbox的实例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
apiVersion: v1
kind: Service
metadata:
  labels:
    app: blackbox-exporter
  name: blackbox-exporter
spec:
  ports:
  - name: blackbox
    port: 9115
    protocol: TCP
  selector:
    app: blackbox-exporter
  type: ClusterIP
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: blackbox-exporter
  name: blackbox-exporter
spec:
  replicas: 1
  selector:
    matchLabels:
      app: blackbox-exporter
  template:
    metadata:
      labels:
        app: blackbox-exporter
    spec:
      containers:
      - image: prom/blackbox-exporter
        name: blackbox-exporter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过kubectl命令，可以在Kubernetes集群中部署Blackbox Exporter实例:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create -f blackbox-exporter-deployment.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如下所示，在镜像prom/blackbox-exporter中包含了默认配置文件中定义了几个常用的探针配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>modules:
  http_2xx:
    prober: http
    http:
  http_post_2xx:
    prober: http
    http:
      method: POST
  tcp_connect:
    prober: tcp
  pop3s_banner:
    prober: tcp
    tcp:
      query_response:
      - expect: &quot;^+OK&quot;
      tls: true
      tls_config:
        insecure_skip_verify: false
  ssh_banner:
    prober: tcp
    tcp:
      query_response:
      - expect: &quot;^SSH-2.0-&quot;
  irc_banner:
    prober: tcp
    tcp:
      query_response:
      - send: &quot;NICK prober&quot;
      - send: &quot;USER prober prober prober :prober&quot;
      - expect: &quot;PING :([^ ]+)&quot;
        send: &quot;PONG \${1}&quot;
      - expect: &quot;^:[^ ]+ 001&quot;
  icmp:
    prober: icmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="探测service可用性" tabindex="-1"><a class="header-anchor" href="#探测service可用性" aria-hidden="true">#</a> 探测Service可用性</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   - job_name: &#39;kubernetes-services&#39;
      metrics_path: /probe
      params:
        module: [http_2xx]
      kubernetes_sd_configs:
      - role: service
      relabel_configs:
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]
        action: keep
        regex: true
      - source_labels: [__address__]
        target_label: __param_target
      - target_label: __address__
        replacement: blackbox-exporter.default.svc.cluster.local:9115
      - source_labels: [__param_target]
        target_label: instance
      - action: labelmap
        regex: __meta_kubernetes_service_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_service_name]
        target_label: kubernetes_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="探测ingress可用性" tabindex="-1"><a class="header-anchor" href="#探测ingress可用性" aria-hidden="true">#</a> 探测Ingress可用性</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    - job_name: &#39;kubernetes-ingresses&#39;
      metrics_path: /probe
      params:
        module: [http_2xx]
      kubernetes_sd_configs:
      - role: ingress
      relabel_configs:
      - source_labels: [__meta_kubernetes_ingress_annotation_prometheus_io_probe]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_ingress_scheme,__address__,__meta_kubernetes_ingress_path]
        regex: (.+);(.+);(.+)
        replacement: \${1}://\${2}\${3}
        target_label: __param_target
      - target_label: __address__
        replacement: blackbox-exporter.default.svc.cluster.local:9115
      - source_labels: [__param_target]
        target_label: instance
      - action: labelmap
        regex: __meta_kubernetes_ingress_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_ingress_name]
        target_label: kubernetes_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),a=[r];function d(v,c){return n(),i("div",null,a)}const u=e(l,[["render",d],["__file","use-prometheus-monitor-k8s-svc-and-ingress-state.html.vue"]]);export{u as default};
