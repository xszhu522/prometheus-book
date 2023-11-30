import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as n,d as r}from"./app-tU1o2vQf.js";const s={},a=r(`<h1 id="在kubernetes下安装部署prometheus" tabindex="-1"><a class="header-anchor" href="#在kubernetes下安装部署prometheus" aria-hidden="true">#</a> 在Kubernetes下安装部署Prometheus</h1><p>部署Prometheus</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create -f prometheus/prometheus-rbac-setup.yml
kubectl create -f prometheus/prometheus-config.yml
kubectl create -f prometheus/prometheus-deployment.yml
kubectl create -f prometheus/prometheus-ingress.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署Exporters</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create -f prometheus/node-exporter-daemonset.yml
kubectl create -f prometheus/blackbox-exporter-deployment.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>部署测试应用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create -f nginx-deployment.yml
kubectl create -f nginx/nginx-service.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,7),i=[a];function l(d,c){return t(),n("div",null,i)}const m=e(s,[["render",l],["__file","index.html.vue"]]);export{m as default};
