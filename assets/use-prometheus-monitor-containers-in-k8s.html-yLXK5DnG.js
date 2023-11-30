import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as r,c as d,a as e,b as n,e as l,d as i}from"./app-d7bHIUBF.js";const o="/prometheus-book/assets/k8s-sd-with-node-with-relabel-1-SYf0-QaV.png",c="/prometheus-book/assets/k8s-sd-with-node-with-relabel-2-YGVmbWdT.png",u={},_=i(`<h1 id="应用容器监控" tabindex="-1"><a class="header-anchor" href="#应用容器监控" aria-hidden="true">#</a> 应用容器监控</h1><p>在第4章的“监控容器运行状态”小节中，我们介绍了如何使用cAdvisor监控主机中容器的运行状态。而Kubernetes直接在Kubelet组件中集成了cAdvisor，cAdvisor会自动采集当前节点上容器CPU，内存，文件系统，网络等资源的使用情况，其默认运行端口为4194。</p><p>登录到MiniKube主机，并且访问本机的4194端口，可以获取到当前节点上cAdvisor的监控样本数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ minikube ssh

$  curl 127.0.0.1:4194/metrics
...
# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1.52506226634e+09
# HELP process_virtual_memory_bytes Virtual memory size in bytes.
# TYPE process_virtual_memory_bytes gauge
process_virtual_memory_bytes 1.1649622016e+10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本节中，我们将利用Prometheus的服务发现能力，自动的找到这些\bcAdvisor的采集目标。</p><h2 id="基于node的服务发现模式" tabindex="-1"><a class="header-anchor" href="#基于node的服务发现模式" aria-hidden="true">#</a> 基于Node的服务发现模式</h2><p>在上一小节中，我们已经能够通过Kubernetes自动的发现当前集群中的所有Node节点。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> kubernetes_sd_configs:
 - role: node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，当role的配置为node时，Prometheus会通过Kubernetes API找到集群中的所有Node对象，并且将其转换为Prometheus的Target对象，从Prometheus UI中可以查看该Target实例包含的所有Metadata标签信息，如下所示，在从MiniKube集群中获取到的一个节点Metadata标签信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>__address__=&quot;192.168.99.100:10250&quot;
__meta_kubernetes_node_address_Hostname=&quot;minikube&quot;
__meta_kubernetes_node_address_InternalIP=&quot;192.168.99.100&quot;
__meta_kubernetes_node_annotation_alpha_kubernetes_io_provided_node_ip=&quot;192.168.99.100&quot;
__meta_kubernetes_node_annotation_node_alpha_kubernetes_io_ttl=&quot;0&quot;
__meta_kubernetes_node_annotation_volumes_kubernetes_io_controller_managed_attach_detach=&quot;true&quot;
__meta_kubernetes_node_label_beta_kubernetes_io_arch=&quot;amd64&quot;
__meta_kubernetes_node_label_beta_kubernetes_io_os=&quot;linux&quot;
__meta_kubernetes_node_label_kubernetes_io_hostname=&quot;minikube&quot;
__meta_kubernetes_node_name=&quot;minikube&quot;
__metrics_path__=&quot;/metrics&quot;
__scheme__=&quot;https&quot;
instance=&quot;minikube&quot;  
job=&quot;kubernetes-nodes&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>__address__</code>默认为当前节点上运行的kubelet的访问地址。从上面的结果可以看出，通过node动态发现的Target会包含如下几类标签：</p><ul><li><code>__meta_kubernetes_node_name</code>：该节点在集群中的名称；</li><li><code>__meta_kubernetes_node_label_&lt;labelname&gt;</code>：该节点中包含的用户自定义标签以及Kubernetes自动生成的标签；</li><li><code>__meta_kubernetes_node_annotation_&lt;annotationname&gt;</code>：该节点中包含的Kubernetes自动生成的注解信息；</li><li><code>__meta_kubernetes_node_address_&lt;address_type&gt;</code>：该节点各种类型（NodeInternalIP，NodeExternalIP，NodeLegacyHostIP，NodeHostName）的访问地址。</li></ul><p>用户也可以通过以下命令查看节点的详细信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl get nodes/minikube -o yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用relabeling修改采集任务" tabindex="-1"><a class="header-anchor" href="#使用relabeling修改采集任务" aria-hidden="true">#</a> 使用Relabeling修改采集任务</h3><p>为了能够通过Prometheus采集到cAdvisor的metrics服务，我们为cAdvisor定义了单独采集任务。该任务将基于Node模式发现集群中所有的节点，并通过Relabel修改Target的数据采集配置，从而获取到cAdvisor的监控数据，修改prometheus-config.yml如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |-
    global:
      scrape_interval:     15s
      evaluation_interval: 15s
    scrape_configs:
    - job_name: &#39;kubernetes-cadvisor&#39;
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      kubernetes_sd_configs:
      - role: node
      relabel_configs:
      - source_labels: [__address__]
        regex: (.+):(.+)
        action: replace
        target_label: __address__
        replacement: $1:4194
      - action: replace
        target_label: __scheme__
        replacement: http
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里定义了三个relabel步骤：</p>`,18),v=e("li",null,[n("默认获取到的target地址为，当前节点中kubelet的访问地址。因此通过正则表达式(.+)😦.+)匹配出IP地址和端口，并将将匹配到的内容按照$1:4194的形式覆盖"),e("code",null,"__address__"),n("的值。 从而获得cAdvisor访问地址；")],-1),m=e("code",null,"__scheme__",-1),b={href:"http://IP:4193/metrics",target:"_blank",rel:"noopener noreferrer"},p=e("li",null,"最后通过labelmap将该节点上的自定义标签，写入到样本中，从而可以方便用户通过这些标签对数据进行聚合。",-1),g=i('<figure><img src="'+o+`" alt="cAdvisor数据采集状态" tabindex="0" loading="lazy"><figcaption>cAdvisor数据采集状态</figcaption></figure><p>如上所示，Prometheus通过自动发现Node节点，并通过Relabel自定义采集方式后的结果。</p><blockquote><p>需要注意的是，通过集群中主机的4194端口获取cAdvisor数据，并不适用于Kubernetes集群，这种方式限制了cAdvisor服务的运行端口。除了直接访问各个节点的cAdvisor服务以外，我们还可以通过Kubernetes的API Server作为代理获取节点上的cAdvisor监控数据。</p></blockquote><p>除了直接访问cAdvisor监听的端口以外，更通用的方式是通过apiserver访问kubelet提供的/metrics/cadvisor接口获取cAdvisor的样本数据。例如，想要获取节点minikube上cAdvisor的监控数据可以使用ca证书和令牌在Kubernetes集群内访问以下地址获取：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>https://kubernetes.default.svc:443/api/v1/nodes/minikube/proxy/metrics/cadvisor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因此，修改kubernetes-cadvisor的relabel配置，通过获取节点的<code>__meta_kubernetes_node_name</code>并重写<code>__metrics_path__</code>将采集任务地址重定向到apiserver的API地址：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    - job_name: &#39;kubernetes-cadvisor&#39;
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      kubernetes_sd_configs:
      - role: node
      relabel_configs:
      - target_label: __address__
        replacement: kubernetes.default.svc:443
      - source_labels: [__meta_kubernetes_node_name]
        regex: (.+)
        target_label: __metrics_path__
        replacement: /api/v1/nodes/\${1}/proxy/metrics/cadvisor
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图所示，Prometheus使用了访问地址后的任务采集状态：</p><figure><img src="`+c+'" alt="基于API Server获取cAdvisor监控数据状态" tabindex="0" loading="lazy"><figcaption>基于API Server获取cAdvisor监控数据状态</figcaption></figure>',9);function h(k,x){const s=t("ExternalLinkIcon");return r(),d("div",null,[_,e("ol",null,[v,e("li",null,[n("默认返回的"),m,n("为https，通过直接修改其值为http，从而可以让Prometheus通过访问"),e("a",b,[n("http://IP:4193/metrics"),l(s)]),n("作为采集目标地址；")]),p]),g])}const P=a(u,[["render",h],["__file","use-prometheus-monitor-containers-in-k8s.html.vue"]]);export{P as default};
