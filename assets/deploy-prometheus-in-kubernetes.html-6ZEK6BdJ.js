import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as i,d as s}from"./app-d7bHIUBF.js";const l="/prometheus-book/assets/kubernetes-prometheus-step1--wKTrVSm.png",d={},a=s(`<h1 id="在kubernetes下部署prometheus" tabindex="-1"><a class="header-anchor" href="#在kubernetes下部署prometheus" aria-hidden="true">#</a> 在Kubernetes下部署Prometheus</h1><p>在上一小节中我们介绍了与Kubernetes的应用管理模型，并且利用MiniKube在本地搭建了一个单节点的Kubernetes。这一部分我们将带领读者通过Kubernetes部署Prometheus实例。</p><h2 id="使用configmaps管理应用配置" tabindex="-1"><a class="header-anchor" href="#使用configmaps管理应用配置" aria-hidden="true">#</a> 使用ConfigMaps管理应用配置</h2><p>当使用Deployment管理和部署应用程序时，用户可以方便了对应用进行扩容或者缩容，从而产生多个Pod实例。为了能够统一管理这些Pod的配置信息，在Kubernetes中可以使用ConfigMaps资源定义和管理这些配置，并且通过环境变量或者文件系统挂载的方式让容器使用这些配置。</p><p>这里将使用ConfigMaps管理Prometheus的配置文件，创建prometheus-config.yml文件，并写入以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval:     15s 
      evaluation_interval: 15s
    scrape_configs:
      - job_name: &#39;prometheus&#39;
        static_configs:
        - targets: [&#39;localhost:9090&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用kubectl命令行工具，在命名空间default创建ConfigMap资源：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create -f prometheus-config.yml
configmap &quot;prometheus-config&quot; created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用deployment部署prometheus" tabindex="-1"><a class="header-anchor" href="#使用deployment部署prometheus" aria-hidden="true">#</a> 使用Deployment部署Prometheus</h2><p>当ConfigMap资源创建成功后，我们就可以通过Volume挂载的方式，将Prometheus的配置文件挂载到容器中。 这里我们通过Deployment部署Prometheus Server实例，创建prometheus-deployment.yml文件，并写入以下内容:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: &quot;Service&quot;
metadata:
  name: prometheus
  labels:
    name: prometheus
spec:
  ports:
  - name: prometheus
    protocol: TCP
    port: 9090
    targetPort: 9090
  selector:
    app: prometheus
  type: NodePort
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    name: prometheus
  name: prometheus
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
      - name: prometheus
        image: prom/prometheus:v2.2.1
        command:
        - &quot;/bin/prometheus&quot;
        args:
        - &quot;--config.file=/etc/prometheus/prometheus.yml&quot;
        ports:
        - containerPort: 9090
          protocol: TCP
        volumeMounts:
        - mountPath: &quot;/etc/prometheus&quot;
          name: prometheus-config
      volumes:
      - name: prometheus-config
        configMap:
          name: prometheus-config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该文件中分别定义了Service和Deployment，Service类型为NodePort，这样我们可以通过虚拟机IP和端口访问到Prometheus实例。为了能够让Prometheus实例使用ConfigMap中管理的配置文件，这里通过volumes声明了一个磁盘卷。并且通过volumeMounts将该磁盘卷挂载到了Prometheus实例的/etc/prometheus目录下。</p><p>使用以下命令创建资源，并查看资源的创建情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl create -f prometheus-deployment.yml
service &quot;prometheus&quot; created
deployment &quot;prometheus&quot; created

$ kubectl get pods
NAME                               READY     STATUS        RESTARTS   AGE
prometheus-55f655696d-wjqcl        1/1       Running       0          5s

$ kubectl get svc
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes      ClusterIP   10.96.0.1        &lt;none&gt;        443/TCP          131d
prometheus      NodePort    10.101.255.236   &lt;none&gt;        9090:32584/TCP   42s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，我们可以通过MiniKube虚拟机的IP地址和端口32584访问到Prometheus的服务。</p><figure><img src="`+l+'" alt="Prometheus UI" tabindex="0" loading="lazy"><figcaption>Prometheus UI</figcaption></figure>',16),r=[a];function t(u,m){return n(),i("div",null,r)}const c=e(d,[["render",t],["__file","deploy-prometheus-in-kubernetes.html.vue"]]);export{c as default};
