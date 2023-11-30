import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as n,d as s}from"./app-NWC4HiYT.js";const a={},r=s(`<h1 id="metric类型" tabindex="-1"><a class="header-anchor" href="#metric类型" aria-hidden="true">#</a> Metric类型</h1><p>在上一小节中我们带领读者了解了Prometheus的底层数据模型，在Prometheus的存储实现上所有的监控样本都是以time-series的形式保存在Prometheus内存的TSDB（时序数据库）中，而time-series所对应的监控指标(metric)也是通过labelset进行唯一命名的。</p><p>从存储上来讲所有的监控指标metric都是相同的，但是在不同的场景下这些metric又有一些细微的差异。 例如，在Node Exporter返回的样本中指标node_load1反应的是当前系统的负载状态，随着时间的变化这个指标返回的样本数据是在不断变化的。而指标node_cpu所获取到的样本数据却不同，它是一个持续增大的值，因为其反应的是CPU的累积使用时间，从理论上讲只要系统不关机，这个值是会无限变大的。</p><p>为了能够帮助用户理解和区分这些不同监控指标之间的差异，Prometheus定义了4种不同的指标类型(metric type)：Counter（计数器）、Gauge（仪表盘）、Histogram（直方图）、Summary（摘要）。</p><p>在Exporter返回的样本数据中，其注释中也包含了该样本的类型。例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP node_cpu Seconds the cpus spent in each mode.
# TYPE node_cpu counter
node_cpu{cpu=&quot;cpu0&quot;,mode=&quot;idle&quot;} 362812.7890625
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="counter-只增不减的计数器" tabindex="-1"><a class="header-anchor" href="#counter-只增不减的计数器" aria-hidden="true">#</a> Counter：只增不减的计数器</h2><p>Counter类型的指标其工作方式和计数器一样，只增不减（除非系统发生重置）。常见的监控指标，如http_requests_total，node_cpu都是Counter类型的监控指标。 一般在定义Counter类型指标的名称时推荐使用_total作为后缀。</p><p>Counter是一个简单但有强大的工具，例如我们可以在应用程序中记录某些事件发生的次数，通过以时序的形式存储这些数据，我们可以轻松的了解该事件产生速率的变化。 PromQL内置的聚合操作和函数可以让用户对这些数据进行进一步的分析：</p><p>例如，通过rate()函数获取HTTP请求量的增长率：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rate(http_requests_total[5m])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询当前系统中，访问量前10的HTTP地址：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>topk(10, http_requests_total)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="gauge-可增可减的仪表盘" tabindex="-1"><a class="header-anchor" href="#gauge-可增可减的仪表盘" aria-hidden="true">#</a> Gauge：可增可减的仪表盘</h2><p>与Counter不同，Gauge类型的指标侧重于反应系统的当前状态。因此这类指标的样本数据可增可减。常见指标如：node_memory_MemFree（主机当前空闲的内存大小）、node_memory_MemAvailable（可用内存大小）都是Gauge类型的监控指标。</p><p>通过Gauge指标，用户可以直接查看系统的当前状态：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node_memory_MemFree
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于Gauge类型的监控指标，通过PromQL内置函数delta()可以获取样本在一段时间返回内的变化情况。例如，计算CPU温度在两个小时内的差异：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>delta(cpu_temp_celsius{host=&quot;zeus&quot;}[2h])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还可以使用deriv()计算样本的线性回归模型，甚至是直接使用predict_linear()对数据的变化趋势进行预测。例如，预测系统磁盘空间在4个小时之后的剩余情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>predict_linear(node_filesystem_free{job=&quot;node&quot;}[1h], 4 * 3600)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用histogram和summary分析数据分布情况" tabindex="-1"><a class="header-anchor" href="#使用histogram和summary分析数据分布情况" aria-hidden="true">#</a> 使用Histogram和Summary分析数据分布情况</h2><p>除了Counter和Gauge类型的监控指标以外，Prometheus还定义了Histogram和Summary的指标类型。Histogram和Summary主要用于统计和分析样本的分布情况。</p><p>在大多数情况下人们都倾向于使用某些量化指标的平均值，例如CPU的平均使用率、页面的平均响应时间。这种方式的问题很明显，以系统API调用的平均响应时间为例：如果大多数API请求都维持在100ms的响应时间范围内，而个别请求的响应时间需要5s，那么就会导致某些WEB页面的响应时间落到中位数的情况，而这种现象被称为长尾问题。</p><p>为了区分是平均的慢还是长尾的慢，最简单的方式就是按照请求延迟的范围进行分组。例如，统计延迟在0<sub>10ms之间的请求数有多少而10</sub>20ms之间的请求数又有多少。通过这种方式可以快速分析系统慢的原因。Histogram和Summary都是为了能够解决这样问题的存在，通过Histogram和Summary类型的监控指标，我们可以快速了解监控样本的分布情况。</p><p>例如，指标prometheus_tsdb_wal_fsync_duration_seconds的指标类型为Summary。 它记录了Prometheus Server中wal_fsync处理的处理时间，通过访问Prometheus Server的/metrics地址，可以获取到以下监控样本数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP prometheus_tsdb_wal_fsync_duration_seconds Duration of WAL fsync.
# TYPE prometheus_tsdb_wal_fsync_duration_seconds summary
prometheus_tsdb_wal_fsync_duration_seconds{quantile=&quot;0.5&quot;} 0.012352463
prometheus_tsdb_wal_fsync_duration_seconds{quantile=&quot;0.9&quot;} 0.014458005
prometheus_tsdb_wal_fsync_duration_seconds{quantile=&quot;0.99&quot;} 0.017316173
prometheus_tsdb_wal_fsync_duration_seconds_sum 2.888716127000002
prometheus_tsdb_wal_fsync_duration_seconds_count 216
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的样本中可以得知当前Prometheus Server进行wal_fsync操作的总次数为216次，耗时2.888716127000002s。其中中位数（quantile=0.5）的耗时为0.012352463，9分位数（quantile=0.9）的耗时为0.014458005s。</p><p>在Prometheus Server自身返回的样本数据中，我们还能找到类型为Histogram的监控指标prometheus_tsdb_compaction_chunk_range_bucket。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP prometheus_tsdb_compaction_chunk_range Final time range of chunks on their first compaction
# TYPE prometheus_tsdb_compaction_chunk_range histogram
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;100&quot;} 0
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;400&quot;} 0
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;1600&quot;} 0
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;6400&quot;} 0
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;25600&quot;} 0
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;102400&quot;} 0
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;409600&quot;} 0
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;1.6384e+06&quot;} 260
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;6.5536e+06&quot;} 780
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;2.62144e+07&quot;} 780
prometheus_tsdb_compaction_chunk_range_bucket{le=&quot;+Inf&quot;} 780
prometheus_tsdb_compaction_chunk_range_sum 1.1540798e+09
prometheus_tsdb_compaction_chunk_range_count 780
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与Summary类型的指标相似之处在于Histogram类型的样本同样会反应当前指标的记录的总数(以_count作为后缀)以及其值的总量（以_sum作为后缀）。不同在于Histogram指标直接反应了在不同区间内样本的个数，区间通过标签len进行定义。</p><p>同时对于Histogram的指标，我们还可以通过histogram_quantile()函数计算出其值的分位数。不同在于Histogram通过histogram_quantile函数是在服务器端计算的分位数。 而Sumamry的分位数则是直接在客户端计算完成。因此对于分位数的计算而言，Summary在通过PromQL进行查询时有更好的性能表现，而Histogram则会消耗更多的资源。反之对于客户端而言Histogram消耗的资源更少。在选择这两种方式时用户应该按照自己的实际场景进行选择。</p>`,32),i=[r];function u(o,d){return t(),n("div",null,i)}const l=e(a,[["render",u],["__file","prometheus-metrics-types.html.vue"]]);export{l as default};
