import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as d,c as o,a as r,b as e,e as t,d as n}from"./app-NWC4HiYT.js";const l="/prometheus-book/assets/node_exporter_metrics-6pyByfXj.png",c="/prometheus-book/assets/node_exporter_targets-cGRxz1zx.png",u="/prometheus-book/assets/host_stats_cpu-iW959Uvm.png",m="/prometheus-book/assets/node_cpu-7qjJStDn.png",p="/prometheus-book/assets/host_stats_mem_used-d0KyDmGC.png",v="/prometheus-book/assets/host_status_disk_io-guVBn3Ox.png",x={},h=n(`<h1 id="使用nodeexporter监控主机" tabindex="-1"><a class="header-anchor" href="#使用nodeexporter监控主机" aria-hidden="true">#</a> 使用NodeExporter监控主机</h1><p>在上一小节中，我们尝试了部署Prometheus Server，并且采集了Prometheus自身的一些运行指标数据。通过Prometheus内置的UI可以对这些采集到的样本数据进行查询，过滤以及聚合，同时Prometheus内置的UI还支持简单的图形化显示需求。</p><p>在Prometheus Server中将用于获取监控样本数据的服务称为一个target实例(例如Prometheus自身)。对于某些应用和服务而言它们可能内置了对Prometheus的支持，而对于没有内置Prometheus支持的监控需求，需要运行单独的采集程序，这些程序被称为Exporter，通过这些Exporter程序，可以使Prometheus可以从这些Exporter间接的获取到相应的监控数据。</p><p>接下来，为了能够采集到主机的监控指标（CPU，内存，磁盘），我们需要在主机上运行一个Node Exporter程序，实现对主机监控的支持。</p><h2 id="安装node-exporter" tabindex="-1"><a class="header-anchor" href="#安装node-exporter" aria-hidden="true">#</a> 安装Node Exporter</h2><h4 id="创建用户" tabindex="-1"><a class="header-anchor" href="#创建用户" aria-hidden="true">#</a> 创建用户</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo useradd --no-create-home node_exporter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="获取并安装软件包" tabindex="-1"><a class="header-anchor" href="#获取并安装软件包" aria-hidden="true">#</a> 获取并安装软件包</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd ~
curl -LO https://github.com/prometheus/node_exporter/releases/download/v0.15.1/node_exporter-0.15.1.linux-amd64.tar.gz

tar xvf node_exporter-0.15.1.linux-amd64.tar.gz

sudo cp node_exporter-0.15.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
rm -rf node_exporter-0.15.1.linux-amd64.tar.gz node_exporter-0.15.1.linux-amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建node-exporter的service-unit文件" tabindex="-1"><a class="header-anchor" href="#创建node-exporter的service-unit文件" aria-hidden="true">#</a> 创建Node Exporter的Service Unit文件</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo vim /etc/systemd/system/node_exporter.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动node-exporter" tabindex="-1"><a class="header-anchor" href="#启动node-exporter" aria-hidden="true">#</a> 启动Node Exporter</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>service node_exporter start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,14),g={href:"http://192.168.33.10:9100/metrics",target:"_blank",rel:"noopener noreferrer"},b=n('<figure><img src="'+l+`" alt="./static/node_exporter_metrics.png" tabindex="0" loading="lazy"><figcaption>./static/node_exporter_metrics.png</figcaption></figure><h2 id="配置主机监控采集任务" tabindex="-1"><a class="header-anchor" href="#配置主机监控采集任务" aria-hidden="true">#</a> 配置主机监控采集任务</h2><h4 id="配置prometheus采集主机信息" tabindex="-1"><a class="header-anchor" href="#配置prometheus采集主机信息" aria-hidden="true">#</a> 配置Prometheus采集主机信息</h4><p>编辑配置文件/etc/prometheus/prometheus.yml，并添加以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    - job_name: &#39;node_exporter&#39;
        scrape_interval: 5s
        static_configs:
        - targets: [&#39;localhost:9100&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们添加了一个新的Job名字为node_exporter。并且定义了一个实例为localhost:9100。</p><p>完整的Prometheus配置文件/etc/prometheus/prometheus.yml如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  scrape_interval: 15s

scrape_configs:
  - job_name: &#39;prometheus&#39;
    scrape_interval: 5s
    static_configs:
      - targets: [&#39;localhost:9090&#39;]
  - job_name: &#39;node_exporter&#39;
    scrape_interval: 5s
    static_configs:
      - targets: [&#39;localhost:9100&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动Prometheus Server</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo service prometheus restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="验证结果" tabindex="-1"><a class="header-anchor" href="#验证结果" aria-hidden="true">#</a> 验证结果</h4>`,11),_={href:"http://192.168.33.10:9090/targets",target:"_blank",rel:"noopener noreferrer"},f=n('<figure><img src="'+c+`" alt="./static/node_exporter_targets.png" tabindex="0" loading="lazy"><figcaption>./static/node_exporter_targets.png</figcaption></figure><p>这时我们可以通过PromQL语言在，Prometheus UI上直接查询主机相关资源的使用情况。</p><p>例如:</p><p>按CPU模式查询主机的CPU使用率：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>avg without (cpu)(irate(node_cpu{mode!=&quot;idle&quot;}[5m]))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>查询主机CPU总体使用率：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sum(avg without (cpu)(irate(node_cpu{mode!=&#39;idle&#39;}[5m]))) by (instance)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+m+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>按主机查询主机内存使用量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sum(node_memory_MemTotal - node_memory_MemFree - node_memory_Buffers - node_memory_Cached) by (instance)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>按主机查询各个磁盘的IO状态：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sum(irate(node_disk_io_time_ms{device!~&#39;^(md\\\\\\\\d+$|dm-)&#39;}[5m]) / 1000) by (instance, device)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',15);function y(k,P){const i=s("ExternalLinkIcon");return d(),o("div",null,[h,r("p",null,[e("NodeExporter启动后，访问"),r("a",g,[e("http://192.168.33.10:9100/metrics"),t(i)]),e("，我们可以获取到当前NodeExporter所在主机的当前资源使用情况的监控数据。")]),b,r("p",null,[e("访问"),r("a",_,[e("http://192.168.33.10:9090/targets"),t(i)]),e("查看所有的采集目标实例，这时我们可以看到新的采集任务：node_exporter以及相应的实例。")]),f])}const z=a(x,[["render",y],["__file","prometheus-quick-start-node-exporter.html.vue"]]);export{z as default};
