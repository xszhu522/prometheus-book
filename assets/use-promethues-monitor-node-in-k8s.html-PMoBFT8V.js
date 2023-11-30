import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as i,d as s}from"./app-NWC4HiYT.js";const d="/prometheus-book/assets/k8s-service-endpoints-YV_4rw0Z.png",r="/prometheus-book/assets/kubernetes-service-endpoints-sd-wi5qkjZr.png",t="/prometheus-book/assets/kubernetes-service-endpoints-sd-targets-JTTqb3Q7.png",a={},l=s(`<h1 id="监控集群基础设施" tabindex="-1"><a class="header-anchor" href="#监控集群基础设施" aria-hidden="true">#</a> 监控集群基础设施</h1><p>在第1章的“初始Prometheus”小节，我们已经基本了解和使用过Node Exporter。Node Exporter能够采集和获取当前所在主机的运行状态数据。本节将带领读者在Kubernetes中部署Node Exporter，并且通过Prometheus自动监控集群中所有节点资源使用情况。</p><h2 id="使用daemonset部署node-exporter" tabindex="-1"><a class="header-anchor" href="#使用daemonset部署node-exporter" aria-hidden="true">#</a> 使用Daemonset部署Node Exporter</h2><p>在本章的“部署Prometheus”小节，我们使用了Kubernetes内置的控制器之一Deployment。Deployment能够确保Prometheus的Pod能够按照预期的状态在集群中运行，而Pod实例可能随机运行在任意节点上。而与Prometheus的部署不同的是，对于Node Exporter而言每个节点只运行一个唯一的实例，此时，就需要使用Kubernetes的另外一种控制器Daemonset。顾名思义，Daemonset的管理方式类似于操作系统中的守护进程。Daemonset会确保在集群中所有（也可以指定）节点上运行一个唯一的Pod实例。</p><p>创建node-exporter-daemonset.yml文件，并写入以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/scrape: &#39;true&#39;
  labels:
    app: node-exporter
    name: node-exporter
  name: node-exporter
spec:
  ports:
  - name: scrape
    port: 9100
    protocol: TCP
  selector:
    app: node-exporter
  type: ClusterIP
---
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  annotations:
    prometheus.io/scrape: &#39;true&#39;
  name: node-exporter
spec:
  template:
    metadata:
      labels:
        app: node-exporter
      name: node-exporter
    spec:
      containers:
      - image: prom/node-exporter
        name: node-exporter
        ports:
        - containerPort: 9100
          hostPort: 9100
          name: scrape
      hostNetwork: true
      hostPID: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于Node Exporter需要能够访问宿主机，因此这里指定了hostNetwork和hostPID，让Pod实例能够以主机网络以及系统进程的形式运行。同时YAML文件中也创建了NodeExporter相应的Service。这样通过Service就可以访问到对应的NodeExporter实例。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl create -f node-exporter-daemonset.yml
service &quot;node-exporter&quot; created
daemonset &quot;node-exporter&quot; created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看Daemonset以及Pod的运行状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl get daemonsets
NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
node-exporter   1         1         1         1            1           &lt;none&gt;          15s

$ kubectl get pods
NAME                               READY     STATUS    RESTARTS   AGE
...
node-exporter-9h56z                1/1       Running   0          51s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于Node Exporter是以主机网络的形式运行，因此直接访问MiniKube的虚拟机IP加上Pod的端口即可访问当前节点上运行的Node Exporter实例:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ minikube ip
192.168.99.100

$ curl http://192.168.99.100:9100/metrics
...
process_start_time_seconds 1.5251401593e+09
# HELP process_virtual_memory_bytes Virtual memory size in bytes.
# TYPE process_virtual_memory_bytes gauge
process_virtual_memory_bytes 1.1984896e+08
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubernetes下service负载均衡原理" tabindex="-1"><a class="header-anchor" href="#kubernetes下service负载均衡原理" aria-hidden="true">#</a> Kubernetes下Service负载均衡原理</h2><p>在Kubernetes下Service是作为一个内部负载均衡器的存在，它对外暴露一个唯一访问地址（ClusterIP），后端则通过Endpoint指向多个Pod实例。</p><figure><img src="`+d+`" alt="Service负载均衡原理" tabindex="0" loading="lazy"><figcaption>Service负载均衡原理</figcaption></figure><p>在Kubernetes中Service和Endpoint是两个独立的资源。如果创建Service的时，指定了Selector选择器。那么Kubernetes会自动根据选择器的去匹配Pod实例，并根据这些Pod的访问信息，自动创建Endpoint资源。</p><p>例如，通过以下命令可以查看Node Exporter实例对应的IP地址：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl get pods -o wide
NAME                               READY     STATUS    RESTARTS   AGE       IP               NODE
node-exporter-st4cd                1/1       Running   0          4m        192.168.99.100   minikube
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于Service中指定了标签选择器（app: node-exporter），Kubernetes就会自动找到该选择器对应的Pod实例的访问信息（这里是192.168.99.100：9100），并创建Service对应的Endpoint，通过以下命令查看：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl get endpoints node-exporter
NAME            ENDPOINTS                                               AGE
node-exporter   192.168.99.100:9100                                     4m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后查看Service的详细信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl describe svc node-exporter
Name:              node-exporter
Namespace:         default
Labels:            app=node-exporter
                   name=node-exporter
Annotations:       prometheus.io/scrape=true
Selector:          app=node-exporter
Type:              ClusterIP
IP:                10.100.42.83
Port:              scrape  9100/TCP
TargetPort:        9100/TCP
Endpoints:         192.168.99.100:9100
Session Affinity:  None
Events:            &lt;none&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将Service与Endpoint分离还带来另外一个好处，如果我们希望集群内的应用程序，能够通过Service的形式访问到集群外的资源（如，外部部署的MySQL）。这是我们可以创建一个不包含Selector的Service即可，并且手段创建该Service需要代理的外部服务即可。</p><p>例如，创建服务mysql-production，并且指向集群外运行的MySQL服务：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Service
metadata:
  name: mysql-production
spec:
  ports:
    - port: 3306
---
kind: Endpoints
apiVersion: v1
metadata:
  name: mysql-production
subsets:
  - addresses:
      - ip: 192.168.1.25
    ports:
      - port: 3306
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用endpoint发现node-exporter实例" tabindex="-1"><a class="header-anchor" href="#使用endpoint发现node-exporter实例" aria-hidden="true">#</a> 使用Endpoint发现Node Exporter实例</h2><p>在了解了Kubernetes下Service与Endpoint的关系以后，\b我们就能大概理解，在Kubernetes下部署应用程序时，通过Endpoint\b是能够找到特定服务的多个访问地址的。这样我们就可以通过这些地址获取到相应的监控指标。 而Service作为负载均衡器，则适用于作为服务可用性的探测标准，因此可以将Blackbox与Service相结合，监控服务的可用性。</p><p>在Prometheus中，通过设置kubernetes_sd_config的role为endpoints指定当前的服务发现模式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubernetes_sd_configs:
- role: endpoints
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，为了区分集群中哪些Endpoint是可以采集的，而哪些是不可以采集的，我们可以通过为Service添加特定的标签进行标记。例如，Node Exporter的Service中包含了自定义的注解：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>metadata:
  annotations:
    prometheus.io/scrape: &#39;true&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过Kubernetes获取到的Endpoint对象，如下所示，是通过Kubernetes自动发现的Endpoint对象的所有metadata标签：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>__address__=&quot;192.168.99.100:9100&quot;
__meta_kubernetes_endpoint_port_name=&quot;scrape&quot;
__meta_kubernetes_endpoint_port_protocol=&quot;TCP&quot;
__meta_kubernetes_endpoint_ready=&quot;true&quot;
__meta_kubernetes_endpoints_name=&quot;node-exporter&quot;
__meta_kubernetes_namespace=&quot;default&quot;
__meta_kubernetes_pod_container_name=&quot;node-exporter&quot;
__meta_kubernetes_pod_container_port_name=&quot;scrape&quot;
__meta_kubernetes_pod_container_port_number=&quot;9100&quot;
__meta_kubernetes_pod_container_port_protocol=&quot;TCP&quot;
__meta_kubernetes_pod_host_ip=&quot;192.168.99.100&quot;
__meta_kubernetes_pod_ip=&quot;192.168.99.100&quot;
__meta_kubernetes_pod_label_app=&quot;node-exporter&quot;
__meta_kubernetes_pod_label_controller_revision_hash=&quot;4286002507&quot;
__meta_kubernetes_pod_label_pod_template_generation=&quot;1&quot;
__meta_kubernetes_pod_name=&quot;node-exporter-st4cd&quot;
__meta_kubernetes_pod_node_name=&quot;minikube&quot;
__meta_kubernetes_pod_ready=&quot;true&quot;
__meta_kubernetes_pod_uid=&quot;7fe1c063-4ce5-11e8-a82a-08002717c1c9&quot;
__meta_kubernetes_service_annotation_prometheus_io_scrape=&quot;true&quot;
__meta_kubernetes_service_label_app=&quot;node-exporter&quot;
__meta_kubernetes_service_label_name=&quot;node-exporter&quot;
__meta_kubernetes_service_name=&quot;node-exporter&quot;
__metrics_path__=&quot;/metrics&quot;
__scheme__=&quot;http&quot;
job=&quot;kubernetes-service-endpoints&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于该Endpoint属于特定的Servie，并且backend指向了具体的Pod实例，所以返回的metadata标签中包含了关联的Service的信息（以<code>__meta_kubernetes_service</code>作为前缀）以及后端Pod的相关信息（以<code>__meta_kubernetes_pod</code>作为浅醉）。</p><p>通过relabeling的keep模式，选择只获取包含了标签<code>__meta_kubernetes_service_annotation_prometheus_io_scrape</code>并且其值为true的Endpoint作为监控目标：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  - job_name: &#39;kubernetes-service-endpoints&#39;
    kubernetes_sd_configs:
    - role: endpoints
    relabel_configs:
    - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
      action: keep
      regex: true
    - source_labels: [__meta_kubernetes_endpoints_name]
      target_label: job
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+r+`" alt="Relabeling保留符合规则的Endpoint" tabindex="0" loading="lazy"><figcaption>Relabeling保留符合规则的Endpoint</figcaption></figure><p>这种基于Service的annotations来控制Prometheus的方式，还可以扩展出更多的玩法。例如，如果应用程序并没有通过/metrics暴露监控样本数据。 下面是一个更完整的采集任务配置如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> -  job_name: &#39;kubernetes-service-endpoints&#39;
    kubernetes_sd_configs:
    - role: endpoints
    relabel_configs:
    - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
      action: keep
      regex: true
    - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
      action: replace
      target_label: __scheme__
      regex: (https?)
    - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
      action: replace
      target_label: __metrics_path__
      regex: (.+)
    - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
      action: replace
      target_label: __address__
      regex: ([^:]+)(?::\\d+)?;(\\d+)
      replacement: $1:$2
    - action: labelmap
      regex: __meta_kubernetes_service_label_(.+)
    - source_labels: [__meta_kubernetes_namespace]
      action: replace
      target_label: kubernetes_namespace
    - source_labels: [__meta_kubernetes_service_name]
      action: replace
      target_label: kubernetes_name
    - source_labels: [__meta_kubernetes_endpoints_name]
      target_label: job
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上步骤，用户可以通过在Service添加注解的形式，更灵活的控制Prometheus的任务采集信息，例如，通过添加注解自定义采集数据的相关配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/scrape: &#39;true&#39;
    prometheus.io/scheme: &#39;https&#39;
    prometheus.io/path: &#39;/custom_metrics&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+t+'" alt="通过Endpoint发现的Node Exporter实例" tabindex="0" loading="lazy"><figcaption>通过Endpoint发现的Node Exporter实例</figcaption></figure>',42),o=[l];function v(u,c){return n(),i("div",null,o)}const _=e(a,[["render",v],["__file","use-promethues-monitor-node-in-k8s.html.vue"]]);export{_ as default};
