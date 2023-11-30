import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as n,d as l}from"./app-tU1o2vQf.js";const s={},r=l(`<h1 id="使用recoding-rules优化性能" tabindex="-1"><a class="header-anchor" href="#使用recoding-rules优化性能" aria-hidden="true">#</a> 使用Recoding Rules优化性能</h1><p>通过PromQL可以实时对Prometheus中采集到的样本数据进行查询，聚合以及其它各种运算操作。而在某些PromQL较为复杂且计算量较大时，直接使用PromQL可能会导致Prometheus响应超时的情况。这时需要一种能够类似于后台批处理的机制能够在后台完成这些复杂运算的计算，对于使用者而言只需要查询这些运算结果即可。Prometheus通过Recoding Rule规则支持这种后台计算的方式，可以实现对复杂查询的性能优化，提高查询效率。</p><h2 id="定义recoding-rules" tabindex="-1"><a class="header-anchor" href="#定义recoding-rules" aria-hidden="true">#</a> 定义Recoding rules</h2><p>在Prometheus配置文件中，通过rule_files定义recoding rule规则文件的访问路径。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rule_files:
  [ - &lt;filepath_glob&gt; ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每一个规则文件通过以下格式进行定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>groups:
  [ - &lt;rule_group&gt; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一个简单的规则文件可能是这个样子的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>groups:
  - name: example
    rules:
    - record: job:http_inprogress_requests:sum
      expr: sum(http_inprogress_requests) by (job)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>rule_group的具体配置项如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># The name of the group. Must be unique within a file.
name: &lt;string&gt;

# How often rules in the group are evaluated.
[ interval: &lt;duration&gt; | default = global.evaluation_interval ]

rules:
  [ - &lt;rule&gt; ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与告警规则一致，一个group下可以包含多条规则rule。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># The name of the time series to output to. Must be a valid metric name.
record: &lt;string&gt;

# The PromQL expression to evaluate. Every evaluation cycle this is
# evaluated at the current time, and the result recorded as a new set of
# time series with the metric name as given by &#39;record&#39;.
expr: &lt;string&gt;

# Labels to add or overwrite before storing the result.
labels:
  [ &lt;labelname&gt;: &lt;labelvalue&gt; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据规则中的定义，Prometheus会在后台完成expr中定义的PromQL表达式计算，并且将计算结果保存到新的时间序列record中。同时还可以通过labels为这些样本添加额外的标签。</p><p>这些规则文件的计算频率与告警规则计算频率一致，都通过global.evaluation_interval定义:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
  [ evaluation_interval: &lt;duration&gt; | default = 1m ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,16),a=[r];function d(t,u){return i(),n("div",null,a)}const o=e(s,[["render",d],["__file","prometheus-recoding-rules.html.vue"]]);export{o as default};
