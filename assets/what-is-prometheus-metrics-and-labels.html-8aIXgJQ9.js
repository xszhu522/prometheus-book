import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as i,d as a}from"./app-d7bHIUBF.js";const s={},d=a(`<h1 id="理解时间序列" tabindex="-1"><a class="header-anchor" href="#理解时间序列" aria-hidden="true">#</a> 理解时间序列</h1><p>在1.2节当中，通过Node Exporter暴露的HTTP服务，Prometheus可以采集到当前主机所有监控指标的样本数据。例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP node_cpu Seconds the cpus spent in each mode.
# TYPE node_cpu counter
node_cpu{cpu=&quot;cpu0&quot;,mode=&quot;idle&quot;} 362812.7890625
# HELP node_load1 1m load average.
# TYPE node_load1 gauge
node_load1 3.0703125
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中非#开头的每一行表示当前Node Exporter采集到的一个监控样本：node_cpu和node_load1表明了当前指标的名称、大括号中的标签则反映了当前样本的一些特征和维度、浮点数则是该监控样本的具体值。</p><h2 id="样本" tabindex="-1"><a class="header-anchor" href="#样本" aria-hidden="true">#</a> 样本</h2><p>Prometheus会将所有采集到的样本数据以时间序列（time-series）的方式保存在内存数据库中，并且定时保存到硬盘上。time-series是按照时间戳和值的序列顺序存放的，我们称之为向量(vector). 每条time-series通过指标名称(metrics name)和一组标签集(labelset)命名。如下所示，可以将time-series理解为一个以时间为Y轴的数字矩阵：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  ^
  │   . . . . . . . . . . . . . . . . .   . .   node_cpu{cpu=&quot;cpu0&quot;,mode=&quot;idle&quot;}
  │     . . . . . . . . . . . . . . . . . . .   node_cpu{cpu=&quot;cpu0&quot;,mode=&quot;system&quot;}
  │     . . . . . . . . . .   . . . . . . . .   node_load1{}
  │     . . . . . . . . . . . . . . . .   . .  
  v
    &lt;------------------ 时间 ----------------&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在time-series中的每一个点称为一个样本（sample），样本由以下三部分组成：</p><ul><li>指标(metric)：metric name和描述当前样本特征的labelsets;</li><li>时间戳(timestamp)：一个精确到毫秒的时间戳;</li><li>样本值(value)： 一个float64的浮点型数据表示当前样本的值。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;--------------- metric ---------------------&gt;&lt;-timestamp -&gt;&lt;-value-&gt;
http_request_total{status=&quot;200&quot;, method=&quot;GET&quot;}@1434417560938 =&gt; 94355
http_request_total{status=&quot;200&quot;, method=&quot;GET&quot;}@1434417561287 =&gt; 94334

http_request_total{status=&quot;404&quot;, method=&quot;GET&quot;}@1434417560938 =&gt; 38473
http_request_total{status=&quot;404&quot;, method=&quot;GET&quot;}@1434417561287 =&gt; 38544

http_request_total{status=&quot;200&quot;, method=&quot;POST&quot;}@1434417560938 =&gt; 4748
http_request_total{status=&quot;200&quot;, method=&quot;POST&quot;}@1434417561287 =&gt; 4785
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="指标-metric" tabindex="-1"><a class="header-anchor" href="#指标-metric" aria-hidden="true">#</a> 指标(Metric)</h2><p>在形式上，所有的指标(Metric)都通过如下格式标示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;metric name&gt;{&lt;label name&gt;=&lt;label value&gt;, ...}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指标的名称(metric name)可以反映被监控样本的含义（比如，<code>http_request_total</code> - 表示当前系统接收到的HTTP请求总量）。指标名称只能由ASCII字符、数字、下划线以及冒号组成并必须符合正则表达式<code>[a-zA-Z_:][a-zA-Z0-9_:]*</code>。</p><p>标签(label)反映了当前样本的特征维度，通过这些维度Prometheus可以对样本数据进行过滤，聚合等。标签的名称只能由ASCII字符、数字以及下划线组成并满足正则表达式<code>[a-zA-Z_][a-zA-Z0-9_]*</code>。</p><p>其中以<code>__</code>作为前缀的标签，是系统保留的关键字，只能在系统内部使用。标签的值则可以包含任何Unicode编码的字符。在Prometheus的底层实现中指标名称实际上是以<code>__name__=&lt;metric name&gt;</code>的形式保存在数据库中的，因此以下两种方式均表示的同一条time-series：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>api_http_requests_total{method=&quot;POST&quot;, handler=&quot;/messages&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等同于：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{__name__=&quot;api_http_requests_total&quot;，method=&quot;POST&quot;, handler=&quot;/messages&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在Prometheus源码中也可以找到指标(Metric)对应的数据结构，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type Metric LabelSet

type LabelSet map[LabelName]LabelValue

type LabelName string

type LabelValue string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),n=[d];function l(u,o){return t(),i("div",null,n)}const m=e(s,[["render",l],["__file","what-is-prometheus-metrics-and-labels.html.vue"]]);export{m as default};
