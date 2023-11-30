import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as r,c as l,a as e,b as n,e as i,d}from"./app-tU1o2vQf.js";const o="/prometheus-book/assets/prometheus-ui-graph-Iu14QuRE.png",u={},c=e("h1",{id:"安装prometheus-server",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装prometheus-server","aria-hidden":"true"},"#"),n(" 安装Prometheus Server")],-1),m=e("p",null,"Prometheus基于Golang编写，编译后的软件包，不依赖于任何的第三方依赖。用户只需要下载对应平台的二进制包，解压并且添加基本的配置即可正常启动Prometheus Server。",-1),v=e("h2",{id:"从二进制包安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#从二进制包安装","aria-hidden":"true"},"#"),n(" 从二进制包安装")],-1),h={href:"https://prometheus.io/download/",target:"_blank",rel:"noopener noreferrer"},p=d(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export VERSION=2.4.3
curl -LO  https://github.com/prometheus/prometheus/releases/download/v$VERSION/prometheus-$VERSION.darwin-amd64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解压，并将Prometheus相关的命令，添加到系统环境变量路径即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tar -xzf prometheus-\${VERSION}.darwin-amd64.tar.gz
cd prometheus-\${VERSION}.darwin-amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解压后当前目录会包含默认的Prometheus配置文件prometheus.yml:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global &#39;evaluation_interval&#39;.
rule_files:
  # - &quot;first_rules.yml&quot;
  # - &quot;second_rules.yml&quot;

# A scrape configuration containing exactly one endpoint to scrape:
# Here it&#39;s Prometheus itself.
scrape_configs:
  # The job name is added as a label \`job=&lt;job_name&gt;\` to any timeseries scraped from this config.
  - job_name: &#39;prometheus&#39;

    # metrics_path defaults to &#39;/metrics&#39;
    # scheme defaults to &#39;http&#39;.

    static_configs:
    - targets: [&#39;localhost:9090&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Prometheus作为一个时间序列数据库，其采集的数据会以文件的形式存储在本地中，默认的存储路径为<code>data/</code>，因此我们需要先手动创建该目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用户也可以通过参数<code>--storage.tsdb.path=&quot;data/&quot;</code>修改本地数据存储的路径。</p><p>启动prometheus服务，其会默认加载当前路径下的prometheus.yaml文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正常的情况下，你可以看到以下输出内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>level=info ts=2018-10-23T14:55:14.499484Z caller=main.go:554 msg=&quot;Starting TSDB ...&quot;
level=info ts=2018-10-23T14:55:14.499531Z caller=web.go:397 component=web msg=&quot;Start listening for connections&quot; address=0.0.0.0:9090
level=info ts=2018-10-23T14:55:14.507999Z caller=main.go:564 msg=&quot;TSDB started&quot;
level=info ts=2018-10-23T14:55:14.508068Z caller=main.go:624 msg=&quot;Loading configuration file&quot; filename=prometheus.yml
level=info ts=2018-10-23T14:55:14.509509Z caller=main.go:650 msg=&quot;Completed loading of configuration file&quot; filename=prometheus.yml
level=info ts=2018-10-23T14:55:14.509537Z caller=main.go:523 msg=&quot;Server is ready to receive web requests.&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用容器安装" tabindex="-1"><a class="header-anchor" href="#使用容器安装" aria-hidden="true">#</a> 使用容器安装</h2><p>对于Docker用户，直接使用Prometheus的镜像即可启动Prometheus Server：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -p 9090:9090 -v /etc/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,15),g={href:"http://localhost:9090",target:"_blank",rel:"noopener noreferrer"},b=e("figure",null,[e("img",{src:o,alt:"Prometheus UI",tabindex:"0",loading:"lazy"}),e("figcaption",null,"Prometheus UI")],-1);function f(_,x){const s=t("ExternalLinkIcon");return r(),l("div",null,[c,m,v,e("p",null,[n("对于非Docker用户，可以从"),e("a",h,[n("https://prometheus.io/download/"),i(s)]),n("找到最新版本的Prometheus Sevrer软件包：")]),p,e("p",null,[n("启动完成后，可以通过"),e("a",g,[n("http://localhost:9090"),i(s)]),n("访问Prometheus的UI界面：")]),b])}const S=a(u,[["render",f],["__file","install-prometheus-server.html.vue"]]);export{S as default};
