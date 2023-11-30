import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as i,d as s}from"./app-tU1o2vQf.js";const r="/prometheus-book/assets/prometheus-k8s-sd-example1-DLcDcwHm.png",d="/prometheus-book/assets/prometheus-k8s-sd-example3-C17KmHsk.png",t={},a=s(`<h1 id="kubernetes下的服务发现" tabindex="-1"><a class="header-anchor" href="#kubernetes下的服务发现" aria-hidden="true">#</a> Kubernetes下的服务发现</h1><p>目前为止，我们已经能够在Kubernetes下部署一个简单的Prometheus实例，不过当前来说它并不能发挥其监控系统的作用，除了Prometheus，暂时没有任何的监控采集目标。在第7章中，我们介绍了Prometheus的服务发现能力，它能够与通过与“中间代理人“的交互，从而动态的获取需要监控的目标实例。而在Kubernetes下Prometheus就是需要与Kubernetes的API进行交互，从而能够动态的发现Kubernetes中部署的所有可监控的目标资源。</p><h2 id="kubernetes的访问授权" tabindex="-1"><a class="header-anchor" href="#kubernetes的访问授权" aria-hidden="true">#</a> Kubernetes的访问授权</h2><p>为了能够让Prometheus能够访问收到认证保护的Kubernetes API，我们首先需要做的是，对Prometheus进行访问授权。在Kubernetes中主要使用基于角色的访问控制模型(Role-Based Access Control)，用于管理Kubernetes下资源访问权限。首先我们需要在Kubernetes下定义角色（ClusterRole），并且为该角色赋予相应的访问权限。同时创建Prometheus所使用的账号（ServiceAccount），最后则是将该账号与角色进行绑定（ClusterRoleBinding）。这些所有的操作在Kubernetes同样被视为是一系列的资源，可以通过YAML文件进行描述并创建，这里创建prometheus-rbac-setup.yml文件，并写入以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: prometheus
rules:
- apiGroups: [&quot;&quot;]
  resources:
  - nodes
  - nodes/proxy
  - services
  - endpoints
  - pods
  verbs: [&quot;get&quot;, &quot;list&quot;, &quot;watch&quot;]
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs: [&quot;get&quot;, &quot;list&quot;, &quot;watch&quot;]
- nonResourceURLs: [&quot;/metrics&quot;]
  verbs: [&quot;get&quot;]
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: prometheus
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: prometheus
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: prometheus
subjects:
- kind: ServiceAccount
  name: prometheus
  namespace: default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中需要注意的是ClusterRole是全局的，不需要指定命名空间。而ServiceAccount是属于特定命名空间的资源。通过kubectl命令创建RBAC对应的各个资源：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl create -f prometheus-rbac-setup.yml
clusterrole &quot;prometheus&quot; created
serviceaccount &quot;prometheus&quot; created
clusterrolebinding &quot;prometheus&quot; created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在完成角色权限以及用户的绑定之后，就可以指定Prometheus使用特定的ServiceAccount创建Pod实例。修改prometheus-deployment.yml文件，并添加serviceAccountName和serviceAccount定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      serviceAccount: prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过kubectl apply对Deployment进行变更升级：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl apply -f prometheus-deployment.yml
service &quot;prometheus&quot; configured
deployment &quot;prometheus&quot; configured

$ kubectl get pods
NAME                               READY     STATUS        RESTARTS   AGE
prometheus-55f655696d-wjqcl        0/1       Terminating   0          38m
prometheus-69f9ddb588-czn2c        1/1       Running       0          6s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定ServiceAccount创建的Pod实例中，会自动将用于访问Kubernetes API的CA证书以及当前账户对应的访问令牌文件挂载到Pod实例的/var/run/secrets/kubernetes.io/serviceaccount/目录下，可以通过以下命令进行查看：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl exec -it prometheus-69f9ddb588-czn2c ls /var/run/secrets/kubernetes.io/serviceaccount/
ca.crt     namespace  token
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h2><p>在Kubernetes下，Promethues通过与Kubernetes API集成目前主要支持5种服务发现模式，分别是：Node、Service、Pod、Endpoints、Ingress。</p><p>通过kubectl命令行，可以方便的获取到当前集群中的所有节点信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl get nodes -o wide
NAME       STATUS    ROLES     AGE       VERSION   EXTERNAL-IP   OS-IMAGE            KERNEL-VERSION   CONTAINER-RUNTIME
minikube   Ready     &lt;none&gt;    164d      v1.8.0    &lt;none&gt;        Buildroot 2017.02   4.9.13           docker://Unknown
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了能够让Prometheus能够获取到当前集群中所有节点的信息，在Prometheus的配置文件中，我们添加如下Job配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- job_name: &#39;kubernetes-nodes&#39;
  tls_config:
    ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
  bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
  kubernetes_sd_configs:
  - role: node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过指定kubernetes_sd_config的模式为node，Prometheus会自动从Kubernetes中发现到所有的node节点并作为当前Job监控的Target实例。如下所示，这里需要指定用于访问Kubernetes API的ca以及token文件路径。</p><p>对于Ingress，Service，Endpoints, Pod的使用方式也是类似的，下面给出了一个完整Prometheus配置的示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
data:
  prometheus.yml: |-
    global:
      scrape_interval:     15s 
      evaluation_interval: 15s
    scrape_configs:

    - job_name: &#39;kubernetes-nodes&#39;
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      kubernetes_sd_configs:
      - role: node

    - job_name: &#39;kubernetes-service&#39;
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      kubernetes_sd_configs:
      - role: service
   
    - job_name: &#39;kubernetes-endpoints&#39;
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      kubernetes_sd_configs:
      - role: endpoints

    - job_name: &#39;kubernetes-ingress&#39;
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      kubernetes_sd_configs:
      - role: ingress
 
    - job_name: &#39;kubernetes-pods&#39;
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      kubernetes_sd_configs:
      - role: pod

kind: ConfigMap
metadata:
  name: prometheus-config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新Prometheus配置文件，并重建Prometheus实例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl apply -f prometheus-config.yml
configmap &quot;prometheus-config&quot; configured

$ kubectl get pods
prometheus-69f9ddb588-rbrs2        1/1       Running   0          4m

$ kubectl delete pods prometheus-69f9ddb588-rbrs2
pod &quot;prometheus-69f9ddb588-rbrs2&quot; deleted

$ kubectl get pods
prometheus-69f9ddb588-rbrs2        0/1       Terminating   0          4m
prometheus-69f9ddb588-wtlsn        1/1       Running       0          14s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Prometheus使用新的配置文件重建之后，打开Prometheus UI，通过Service Discovery页面可以查看到当前Prometheus通过Kubernetes发现的所有资源对象了：</p><figure><img src="`+r+`" alt="Service Discovery发现的实例" tabindex="0" loading="lazy"><figcaption>Service Discovery发现的实例</figcaption></figure><p>同时Prometheus会自动将该资源的所有信息，并通过标签的形式体现在Target对象上。如下所示，是Prometheus获取到的Node节点的标签信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>__address__=&quot;192.168.99.100:10250&quot;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前为止，我们已经能够通过Prometheus自动发现Kubernetes集群中的各类资源以及其基本信息。不过，如果现在查看Prometheus的Target状态页面，结果可能会让人不太满意：</p><figure><img src="`+d+'" alt="Target页面状态" tabindex="0" loading="lazy"><figcaption>Target页面状态</figcaption></figure><p>虽然Prometheus能够自动发现所有的资源对象，并且将其作为Target对象进行数据采集。 但并不是所有的资源对象都是支持Promethues的，并且不同类型资源对象的采集方式可能是不同的。因此，在实际的操作中，我们需要有明确的监控目标，并且针对不同类型的监控目标设置不同的数据采集方式。</p><p>接下来，我们将利用Prometheus的服务发现能力，实现对Kubernetes集群的全面监控。</p>',32),u=[a];function l(c,v){return n(),i("div",null,u)}const b=e(t,[["render",l],["__file","service-discovery-with-kubernetes.html.vue"]]);export{b as default};
