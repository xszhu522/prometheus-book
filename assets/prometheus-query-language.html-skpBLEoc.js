import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as a,d}from"./app-tU1o2vQf.js";const i={},s=d(`<h1 id="初识promql" tabindex="-1"><a class="header-anchor" href="#初识promql" aria-hidden="true">#</a> 初识PromQL</h1><p>Prometheus通过指标名称（metrics name）以及对应的一组标签（labelset）唯一定义一条时间序列。指标名称反映了监控样本的基本标识，而label则在这个基本特征上为采集到的数据提供了多种特征维度。用户可以基于这些特征维度过滤，聚合，统计从而产生新的计算后的一条时间序列。</p><p>PromQL是Prometheus内置的数据查询语言，其提供对时间序列数据丰富的查询，聚合以及逻辑运算能力的支持。并且被广泛应用在Prometheus的日常应用当中，包括对数据查询、可视化、告警处理当中。可以这么说，PromQL是Prometheus所有应用场景的基础，理解和掌握PromQL是Prometheus入门的第一课。</p><h2 id="查询时间序列" tabindex="-1"><a class="header-anchor" href="#查询时间序列" aria-hidden="true">#</a> 查询时间序列</h2><p>当Prometheus通过Exporter采集到相应的监控指标样本数据后，我们就可以通过PromQL对监控样本数据进行查询。</p><p>当我们直接使用监控指标名称查询时，可以查询该指标下的所有时间序列。如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等同于：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该表达式会返回指标名称为http_requests_total的所有时间序列：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{code=&quot;200&quot;,handler=&quot;alerts&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;}=(20889@1518096812.326)
http_requests_total{code=&quot;200&quot;,handler=&quot;graph&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;}=(21287@1518096812.326)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>PromQL还支持用户根据时间序列的标签匹配模式来对时间序列进行过滤，目前主要支持两种匹配模式：完全匹配和正则匹配。</p><p>PromQL支持使用<code>=</code>和<code>!=</code>两种完全匹配模式：</p><ul><li>通过使用<code>label=value</code>可以选择那些标签满足表达式定义的时间序列；</li><li>反之使用<code>label!=value</code>则可以根据标签匹配排除时间序列；</li></ul><p>例如，如果我们只需要查询所有http_requests_total时间序列中满足标签instance为localhost:9090的时间序列，则可以使用如下表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{instance=&quot;localhost:9090&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>反之使用<code>instance!=&quot;localhost:9090&quot;</code>则可以排除这些时间序列：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{instance!=&quot;localhost:9090&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除了使用完全匹配的方式对时间序列进行过滤以外，PromQL还可以支持使用正则表达式作为匹配条件，多个表达式之间使用<code>|</code>进行分离：</p><ul><li>使用<code>label=~regx</code>表示选择那些标签符合正则表达式定义的时间序列；</li><li>反之使用<code>label!~regx</code>进行排除；</li></ul><p>例如，如果想查询多个环节下的时间序列序列可以使用如下表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{environment=~&quot;staging|testing|development&quot;,method!=&quot;GET&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="范围查询" tabindex="-1"><a class="header-anchor" href="#范围查询" aria-hidden="true">#</a> 范围查询</h2><p>直接通过类似于PromQL表达式<code>http_requests_total</code>查询时间序列时，会选择出所有属于该度量指标的时序的当前采样值，这样的返回结果我们称之为__瞬时向量__。而相应的这样的表达式称之为__瞬时向量表达式__。</p><p>而如果我们想过去一段时间范围内的样本数据时，我们则需要使用__区间向量表达式__。区间向量表达式和瞬时向量表达式之间的差异在于在区间向量表达式中我们需要定义时间选择的范围，时间范围通过时间范围选择器<code>[]</code>进行定义。例如，通过以下表达式可以选择最近5分钟内的所有样本数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{}[5m]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该表达式将会返回查询到的时间序列中最近5分钟的所有样本数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{code=&quot;200&quot;,handler=&quot;alerts&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;}=[
    1@1518096812.326
    1@1518096817.326
    1@1518096822.326
    1@1518096827.326
    1@1518096832.326
    1@1518096837.325
]
http_requests_total{code=&quot;200&quot;,handler=&quot;graph&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;}=[
    4 @1518096812.326
    4@1518096817.326
    4@1518096822.326
    4@1518096827.326
    4@1518096832.326
    4@1518096837.325
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过区间向量表达式查询到的结果我们称为__区间向量__。</p><p>除了使用m表示分钟以外，PromQL的时间范围选择器支持其它时间单位：</p><ul><li>s - 秒</li><li>m - 分钟</li><li>h - 小时</li><li>d - 天</li><li>w - 周</li><li>y - 年</li></ul><h2 id="时间位移操作" tabindex="-1"><a class="header-anchor" href="#时间位移操作" aria-hidden="true">#</a> 时间位移操作</h2><p>在瞬时向量表达式或者区间向量表达式中，都是以当前时间为基准：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_request_total{} # 瞬时向量表达式，选择当前最新的数据
http_request_total{}[5m] # 区间向量表达式，选择以当前时间为基准，5分钟内的数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>而如果我们想查询，5分钟前的瞬时样本数据，或昨天一天的区间内的样本数据呢? 这个时候我们就可以使用位移操作，位移操作的关键字为<strong>offset</strong>。</p><p>可以使用offset时间位移操作：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_request_total{} offset 5m
http_request_total{}[1d] offset 1d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用聚合操作" tabindex="-1"><a class="header-anchor" href="#使用聚合操作" aria-hidden="true">#</a> 使用聚合操作</h2><p>一般来说，如果描述样本特征的标签(label)在并非唯一的情况下，通过PromQL查询数据，会返回多条满足这些特征维度的时间序列。而PromQL提供的聚合操作可以用来对这些时间序列进行处理，形成一条新的时间序列：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查询系统所有http请求的总量
sum(http_request_total)

# 按照mode计算主机CPU的平均使用时间
avg(node_cpu) by (mode)

# 按照主机查询各个主机的CPU使用率
sum(sum(irate(node_cpu{mode!=&#39;idle&#39;}[5m]))  / sum(irate(node_cpu[5m]))) by (instance)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="标量和字符串" tabindex="-1"><a class="header-anchor" href="#标量和字符串" aria-hidden="true">#</a> 标量和字符串</h2><p>除了使用瞬时向量表达式和区间向量表达式以外，PromQL还直接支持用户使用标量(Scalar)和字符串(String)。</p><h3 id="标量-scalar-一个浮点型的数字值" tabindex="-1"><a class="header-anchor" href="#标量-scalar-一个浮点型的数字值" aria-hidden="true">#</a> 标量（Scalar）：一个浮点型的数字值</h3><p>标量只有一个数字，没有时序。</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>需要注意的是，当使用表达式count(http_requests_total)，返回的数据类型，依然是瞬时向量。用户可以通过内置函数scalar()将单个瞬时向量转换为标量。</p></blockquote><h3 id="字符串-string-一个简单的字符串值" tabindex="-1"><a class="header-anchor" href="#字符串-string-一个简单的字符串值" aria-hidden="true">#</a> 字符串（String）：一个简单的字符串值</h3><p>直接使用字符串，作为PromQL表达式，则会直接返回字符串。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;this is a string&quot;
&#39;these are unescaped: \\n \\\\ \\t&#39;
\`these are not unescaped: \\n &#39; &quot; \\t\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合法的promql表达式" tabindex="-1"><a class="header-anchor" href="#合法的promql表达式" aria-hidden="true">#</a> 合法的PromQL表达式</h2><p>所有的PromQL表达式都必须至少包含一个指标名称(例如http_request_total)，或者一个不会匹配到空字符串的标签过滤器(例如{code=&quot;200&quot;})。</p><p>因此以下两种方式，均为合法的表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_request_total # 合法
http_request_total{} # 合法
{method=&quot;get&quot;} # 合法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而如下表达式，则不合法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{job=~&quot;.*&quot;} # 不合法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同时，除了使用<code>&lt;metric name&gt;{label=value}</code>的形式以外，我们还可以使用内置的<code>__name__</code>标签来指定监控指标名称：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{__name__=~&quot;http_request_total&quot;} # 合法
{__name__=~&quot;node_disk_bytes_read|node_disk_bytes_written&quot;} # 合法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,58),n=[s];function l(r,o){return t(),a("div",null,n)}const v=e(i,[["render",l],["__file","prometheus-query-language.html.vue"]]);export{v as default};