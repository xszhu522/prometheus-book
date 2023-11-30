import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as n,d as i}from"./app-NWC4HiYT.js";const t={},r=i(`<h1 id="在prometheus-operator中使用自定义配置" tabindex="-1"><a class="header-anchor" href="#在prometheus-operator中使用自定义配置" aria-hidden="true">#</a> 在Prometheus Operator中使用自定义配置</h1><p>在Prometheus Operator我们通过声明式的创建如Prometheus, ServiceMonitor这些自定义的资源类型来自动化部署和管理Prometheus的相关组件以及配置。而在一些特殊的情况下，对于用户而言，可能还是希望能够手动管理Prometheus配置文件，而非通过Prometheus Operator自动完成。 为什么？ 实际上Prometheus Operator对于Job的配置只适用于在Kubernetes中部署和管理的应用程序。如果你希望使用Prometheus监控一些其他的资源，例如AWS或者其他平台中的基础设施或者应用，这些并不在Prometheus Operator的能力范围之内。</p><p>为了能够在通过Prometheus Operator创建的Prometheus实例中使用自定义配置文件，我们只能创建一个不包含任何与配置文件内容相关的Prometheus实例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  name: inst-cc
  namespace: monitoring
spec:
  serviceAccountName: prometheus
  resources:
    requests:
      memory: 400Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将以上内容保存到prometheus-inst-cc.yaml文件中，并且通过kubectl创建:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl -n monitoring create -f prometheus-inst-cc.yaml
prometheus.monitoring.coreos.com/inst-cc created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果查看新建Prometheus的Pod实例YAML定义，我们可以看到Pod中会包含一个volume配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>volumes:
  - name: config
    secret:
      defaultMode: 420
      secretName: prometheus-inst-cc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Prometheus的配置文件实际上是保存在名为<code>prometheus-&lt;name-of-prometheus-object&gt;</code>的Secret中，当用户创建的Prometheus中关联ServiceMonitor这类会影响配置文件内容的定义时，Promethues Operator会自动管理。而如果Prometheus定义中不包含任何与配置相关的定义，那么Secret的管理权限就落到了用户自己手中。</p><p>通过修改prometheus-inst-cc的内容，从而可以让用户可以使用自定义的Prometheus配置文件，作为示例，我们创建一个prometheus.yaml文件并添加以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  scrape_interval: 10s
  scrape_timeout: 10s
  evaluation_interval: 10s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成文件内容的base64编码后的内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat prometheus.yaml | base64
Z2xvYmFsOgogIHNjcmFwZV9pbnRlcnZhbDogMTBzCiAgc2NyYXBlX3RpbWVvdXQ6IDEwcwogIGV2YWx1YXRpb25faW50ZXJ2YWw6IDEwcw==
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改名为prometheus-inst-cc的Secret内容，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl -n monitoring edit secret prometheus-inst-cc
# 省略其它内容
data:
  prometheus.yaml: &quot;Z2xvYmFsOgogIHNjcmFwZV9pbnRlcnZhbDogMTBzCiAgc2NyYXBlX3RpbWVvdXQ6IDEwcwogIGV2YWx1YXRpb25faW50ZXJ2YWw6IDEwcw==&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过port-forward在本地访问新建的Prometheus实例，观察配置文件变化即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl -n monitoring port-forward statefulsets/prometheus-inst-cc 9091:9090
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,17),a=[r];function d(o,c){return s(),n("div",null,a)}const m=e(t,[["render",d],["__file","use-custom-configuration-in-operator.html.vue"]]);export{m as default};
