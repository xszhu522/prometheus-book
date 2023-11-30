import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as d,d as o}from"./app-tU1o2vQf.js";const a={},i=o(`<h1 id="promql操作符" tabindex="-1"><a class="header-anchor" href="#promql操作符" aria-hidden="true">#</a> PromQL操作符</h1><p>PromQL除了能够对数据进行基本的查询统计以外，还支持时间序列之间进行逻辑和数学运算。这一小节中将重点介绍如何利用PromQL对时间序列进行各种逻辑和数学运算的。</p><h2 id="数学运算符" tabindex="-1"><a class="header-anchor" href="#数学运算符" aria-hidden="true">#</a> 数学运算符</h2><p>算术运算支持用于：标量和标量、瞬时向量和标量、瞬时向量和瞬时之间的运算。</p><p>在PromQL中支持使用常用的算术运算符：</p><ul><li><code>+</code> (加法)</li><li><code>-</code> (减法)</li><li><code>*</code> (乘法)</li><li><code>/</code> (除法)</li><li><code>%</code> (求余)</li><li><code>^</code> (幂运算)</li></ul><h4 id="标量与标量" tabindex="-1"><a class="header-anchor" href="#标量与标量" aria-hidden="true">#</a> 标量与标量</h4><p>标量和标量之间进行数学运算，产生一个新的标量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2 * 2 # 产生标量4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="标量与瞬时向量" tabindex="-1"><a class="header-anchor" href="#标量与瞬时向量" aria-hidden="true">#</a> 标量与瞬时向量</h4><p>标量和瞬时向量之间进行数学运算，数学运算符将被作用于瞬时向量中的每一个样本值。并且产生一个新的瞬时向量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{code=&quot;200&quot;,handler=&quot;alerts&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;} =&gt; 1@1518145642.308
http_requests_total{code=&quot;200&quot;,handler=&quot;federate&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;} =&gt; 1@1518145642.308
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，如果表达式http_requests_total{}查询出一组时间序列的瞬时样本数据，那<code>*5</code>操作会将每一条时间序列数据中的瞬时样本数据<code>*5</code>， 并且产生一组新的时间序列。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{} * 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{code=&quot;200&quot;,handler=&quot;alerts&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;} =&gt; 5@1518145642.308
http_requests_total{code=&quot;200&quot;,handler=&quot;federate&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;} =&gt; 5@1518145642.308
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="瞬时向量与瞬时向量" tabindex="-1"><a class="header-anchor" href="#瞬时向量与瞬时向量" aria-hidden="true">#</a> 瞬时向量与瞬时向量</h4><p>两个瞬时向量之间进行数学运算，数学运算将将会作用于左边数据中的每一个样本数据，与该样本在右边数据中<strong>匹配</strong>到的样本数据之间。</p><p>例如,</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node_disk_bytes_written + node_disk_bytes_written
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表达式node_disk_bytes_written返回当前主机中各个磁盘的写入数据总量的瞬时向量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node_disk_bytes_written{device=&quot;sda&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;}=&gt;1634967552@1518146427.807
node_disk_bytes_written{device=&quot;sdb&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;}=&gt;0@1518146427.807
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>表达式node_disk_bytes_read{}会返回，当前主机中各个磁盘的读取数据总量的瞬时向量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node_disk_bytes_read{device=&quot;sda&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;}=&gt;864551424@1518146427.807
node_disk_bytes_read{device=&quot;sdb&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;}=&gt;1744384@1518146427.807
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>匹配规则会比较两个表达式返回的瞬时向量中的所有标签。标签的键值对完全相等则表示匹配成功，并将运算符作用域两个匹配的样本数据中。返回一组新的瞬时向量，同时结果中会丢弃指标名称。对于没有匹配的样本数据，则不会出现在运算结果中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{device=&quot;sda&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;}=&gt;1634967552@1518146427.807 + 864551424@1518146427.807
{device=&quot;sdb&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;}=&gt;0@1518146427.807 + 1744384@1518146427.807
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>即结果为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{device=&quot;sda&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;}=&gt;2499568128@1518146427.807
{device=&quot;sdb&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;}=&gt;1744384@1518146427.807
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符" aria-hidden="true">#</a> 比较运算符</h3><p>比较运算符运算支持：标量和标量、瞬时向量和标量、瞬时向量和瞬时向量之间的运算。</p><p>目前，Prometheus支持以下，比较运算符：</p><ul><li><code>==</code> (相等)</li><li><code>!=</code> (不相等)</li><li><code>&gt;</code> (大于)</li><li><code>&lt;</code> (小于)</li><li><code>&gt;=</code> (大于等于)</li><li><code>&lt;=</code> (小于等于)</li></ul><h4 id="瞬时向量与标量" tabindex="-1"><a class="header-anchor" href="#瞬时向量与标量" aria-hidden="true">#</a> 瞬时向量与标量</h4><p>瞬时向量和标量之间进行比较运算时，PromQL的默认行为会依次将瞬时向量中的所有样本与标量之间进行比较运算。如果比较结果为true则保留样本，如果比较结果为false则丢弃该样本，从而产生一条新的瞬时时间序列。</p><p>例如，当需要找到当前系统请求量大于100次的处理模块，可以使用表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total &gt; 100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该表达式会过滤监控指标http_requests_total的所有时间序列，返回瞬时样本值满足条件比较条件(&gt; 1000)的所有时间序列。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{code=&quot;200&quot;,handler=&quot;prometheus&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;}  36733
http_requests_total{code=&quot;200&quot;,handler=&quot;prometheus&quot;,instance=&quot;localhost:9100&quot;,job=&quot;node_exporter&quot;,method=&quot;get&quot;}  37131
http_requests_total{code=&quot;200&quot;,handler=&quot;query&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;}  126
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用bool改变比较运算的默认行为" tabindex="-1"><a class="header-anchor" href="#使用bool改变比较运算的默认行为" aria-hidden="true">#</a> 使用bool改变比较运算的默认行为</h4><p>默认情况下比较运算符的默认行为是对时序数据进行过滤。而在其它的情况下我们可能需要的是真正的布尔结果。例如，只需要知道当前模块的HTTP请求量是否&gt;=1000，如果大于等于1000则返回1（true）否则返回0（false）。这时我们可以使用bool改变比较运算的默认行为。</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total &gt; bool 100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用bool修改比较运算的默认行为之后，比较运算不会对时间序列进行过滤，而是直接依次瞬时向量中的各个样本数据与标量的比较结果0或者1。从而形成一条新的时间序列。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_requests_total{code=&quot;200&quot;,handler=&quot;query&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;}  1
http_requests_total{code=&quot;200&quot;,handler=&quot;query_range&quot;,instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;,method=&quot;get&quot;}  0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="标量和标量" tabindex="-1"><a class="header-anchor" href="#标量和标量" aria-hidden="true">#</a> 标量和标量</h4><p>标量和标量之间进行比较运算，根据比较的结果产生一个新的标量0（false）或者1（true）用于返回比较的结果。需要注意的时，标量和标量之间进行比较时，必须使用bool进行修饰，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2 == bool 2 # 结果为1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="瞬时向量和瞬时向量" tabindex="-1"><a class="header-anchor" href="#瞬时向量和瞬时向量" aria-hidden="true">#</a> 瞬时向量和瞬时向量</h4><p>瞬时向量和瞬时向量之间，进行比较运算时，根据默认的匹配规则，依次比较匹配到的样本数据。默认情况下，如果匹配到的数据比较结果为true则保留，反之则丢弃。从而形成一条新的时间序列。 同样，我们可以通过bool修饰符来改变比较运算的默认行为。</p><p>例如，使用表达式获取当前正常的任务状态：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>up == 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者我们只想知道当前任务的状态是否为正常：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>up == bool 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="逻辑-集合运算符" tabindex="-1"><a class="header-anchor" href="#逻辑-集合运算符" aria-hidden="true">#</a> 逻辑/集合运算符</h3><p>逻辑运算符只支持在瞬时向量和瞬时向量之间使用。</p><p>目前，Prometheus支持以下，比较逻辑运算符有：</p><ul><li><code>and</code> (并且)</li><li><code>or</code> (或者)</li><li><code>unless</code> (排除)</li></ul><p><em><strong>vector1 and vector2</strong></em> 会产生一个由vector1的元素组成的新的向量。该向量包含vector1中完全匹配vector2中的元素组成。</p><p><em><strong>vector1 or vector2</strong></em> 会产生一个新的向量，该向量包含vector1中所有的\b样本数据，以及vector2中没有与vector1匹配到的样本数据。</p><p><em><strong>vector1 unless vector2</strong></em> 会产生一个新的向量，新向量中的元素由vector1中没有与vector2匹配的元素组成。</p><h2 id="向量匹配模式" tabindex="-1"><a class="header-anchor" href="#向量匹配模式" aria-hidden="true">#</a> 向量匹配模式</h2><p>向量与向量之间进行运算操作时会基于默认的匹配规则：依次找到与左边向量元素匹配（标签完全一致）的\b右边向量元素进行运算，如果没找到匹配元素，则直接丢弃。</p><p>接下来将介绍在PromQL中有两种典型的匹配模式：一对一（one-to-one）,多对一（many-to-one）或一对多（one-to-many）。</p><h3 id="一对一匹配" tabindex="-1"><a class="header-anchor" href="#一对一匹配" aria-hidden="true">#</a> 一对一匹配</h3><p>一对一\b匹配模式会从操作符两边表达式获取的瞬时向量依次比较并找到唯一匹配(标签完全一致)的样本值。默认情况下，使用表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vector1 &lt;operator&gt; vector2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在操作符两边表达式标签不一致的情况下，可以使用on(label list)或者ignoring(label list）来修改便签的匹配行为。使用ignoreing可以在匹配时忽略某些便签。而on则用于将匹配行为限定在某些便签之内。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;vector expr&gt; &lt;bin-op&gt; ignoring(&lt;label list&gt;) &lt;vector expr&gt;
&lt;vector expr&gt; &lt;bin-op&gt; on(&lt;label list&gt;) &lt;vector expr&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如当存在样本：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>method_code:http_errors:rate5m{method=&quot;get&quot;, code=&quot;500&quot;}  24
method_code:http_errors:rate5m{method=&quot;get&quot;, code=&quot;404&quot;}  30
method_code:http_errors:rate5m{method=&quot;put&quot;, code=&quot;501&quot;}  3
method_code:http_errors:rate5m{method=&quot;post&quot;, code=&quot;500&quot;} 6
method_code:http_errors:rate5m{method=&quot;post&quot;, code=&quot;404&quot;} 21

method:http_requests:rate5m{method=&quot;get&quot;}  600
method:http_requests:rate5m{method=&quot;del&quot;}  34
method:http_requests:rate5m{method=&quot;post&quot;} 120
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用PromQL表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>method_code:http_errors:rate5m{code=&quot;500&quot;} / ignoring(code) method:http_requests:rate5m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该表达式会返回在过去5分钟内，HTTP请求状态码为500的在所有请求中的比例。如果没有使用ignoring(code)，操作符两边表达式返回的瞬时向量中将找不到任何一个标签完全相同的匹配项。</p><p>因此结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{method=&quot;get&quot;}  0.04            //  24 / 600
{method=&quot;post&quot;} 0.05            //   6 / 120
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同时由于method为put和del的\b样本\b找不到匹配项，因此不会出现在结果当中。</p><h3 id="多对一和一对多" tabindex="-1"><a class="header-anchor" href="#多对一和一对多" aria-hidden="true">#</a> 多对一和一对多</h3><p>多对一和一对多两种匹配模式指的是“一”侧的每一个向量元素可以与&quot;多&quot;侧的多个元素匹配的情况。在这种情况下，必须使用group修饰符：group_left或者group_right来确定哪一个向量具有更高的基数（充当“多”的角色）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;vector expr&gt; &lt;bin-op&gt; ignoring(&lt;label list&gt;) group_left(&lt;label list&gt;) &lt;vector expr&gt;
&lt;vector expr&gt; &lt;bin-op&gt; ignoring(&lt;label list&gt;) group_right(&lt;label list&gt;) &lt;vector expr&gt;
&lt;vector expr&gt; &lt;bin-op&gt; on(&lt;label list&gt;) group_left(&lt;label list&gt;) &lt;vector expr&gt;
&lt;vector expr&gt; &lt;bin-op&gt; on(&lt;label list&gt;) group_right(&lt;label list&gt;) &lt;vector expr&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多对一和一对多两种模式一定是出现在操作符两侧表达式返回的向量标签不一致的情况。因此需要使用ignoring和on修饰符来排除或者限定匹配的标签列表。</p><p>例如,使用表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>method_code:http_errors:rate5m / ignoring(code) group_left method:http_requests:rate5m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该表达式中，左向量<code>method_code:http_errors:rate5m</code>包含两个标签method和code。而右向量<code>method:http_requests:rate5m</code>中只包含一个标签method，因此匹配时需要使用ignoring限定匹配的标签为code。 在限定匹配标签后，右向量中的元素可能匹配到多个左向量中的元素 因此该表达式的匹配模式为多对一，需要使用group修饰符group_left指定左向量具有更好的基数。</p><p>最终的运算结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{method=&quot;get&quot;, code=&quot;500&quot;}  0.04            //  24 / 600
{method=&quot;get&quot;, code=&quot;404&quot;}  0.05            //  30 / 600
{method=&quot;post&quot;, code=&quot;500&quot;} 0.05            //   6 / 120
{method=&quot;post&quot;, code=&quot;404&quot;} 0.175           //  21 / 120
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提醒：group修饰符只能在比较和数学运算符中使用。在逻辑运算and,unless和or才注意操作中默认与右向量中的所有元素进行匹配。</p></blockquote><h2 id="聚合操作" tabindex="-1"><a class="header-anchor" href="#聚合操作" aria-hidden="true">#</a> 聚合操作</h2><p>Prometheus还提供了下列内置的聚合操作符，这些操作符作用域瞬时向量。可以将瞬时表达式返回的样本数据进行聚合，形成一个新的时间序列。</p><ul><li><code>sum</code> (求和)</li><li><code>min</code> (最小值)</li><li><code>max</code> (最大值)</li><li><code>avg</code> (平均值)</li><li><code>stddev</code> (标准差)</li><li><code>stdvar</code> (标准差异)</li><li><code>count</code> (计数)</li><li><code>count_values</code> (对value进行计数)</li><li><code>bottomk</code> (后n条时序)</li><li><code>topk</code> (前n条时序)</li><li><code>quantile</code> (分布统计)</li></ul><p>使用聚合操作的语法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;aggr-op&gt;([parameter,] &lt;vector expression&gt;) [without|by (&lt;label list&gt;)]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中只有<code>count_values</code>, <code>quantile</code>, <code>topk</code>, <code>bottomk</code>支持参数(parameter)。</p><p>without用于从计算结果中移除列举的标签，而保留其它标签。by则正好相反，结果向量中只保留列出的标签，其余标签则移除。通过without和by可以按照样本的问题对数据进行聚合。</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sum(http_requests_total) without (instance)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等价于</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sum(http_requests_total) by (code,handler,job,method)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果只需要计算整个应用的HTTP请求总量，可以直接使用表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sum(http_requests_total)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>count_values用于时间序列中每一个样本值出现的次数。count_values会为每一个唯一的样本值输出一个时间序列，并且每一个时间序列包含一个额外的标签。</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>count_values(&quot;count&quot;, http_requests_total)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>topk和bottomk则用于对样本值进行排序，返回当前样本值前n位，或者后n位的时间序列。</p><p>获取HTTP请求数前5位的时序样本数据，可以使用表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>topk(5, http_requests_total)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>quantile用于计算当前样本数据值的分布情况quantile(φ, express)其中0 ≤ φ ≤ 1。</p><p>例如，当φ为0.5时，即表示找到当前样本数据中的中位数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>quantile(0.5, http_requests_total)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="操作符优先级" tabindex="-1"><a class="header-anchor" href="#操作符优先级" aria-hidden="true">#</a> 操作符优先级</h2><p>最后对于复杂类型的表达式，我们需要了解运算操作的优先级。</p><p>例如，查询主机的CPU使用率，我们可以使用表达式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>100 * (1 - avg (irate(node_cpu{mode=&#39;idle&#39;}[5m])) by(job) )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中irate是PromQL中的内置函数，用于计算区间向量中时间序列每秒的即时增长率。关于内置函数的部分，会在下一节详细介绍。</p><p>在PromQL操作符中优先级由高到低依次为：</p><ol><li><code>^</code></li><li><code>*, /, %</code></li><li><code>+, -</code></li><li><code>==, !=, &lt;=, &lt;, &gt;=, &gt;</code></li><li><code>and, unless</code></li><li><code>or</code></li></ol>`,116),l=[i];function s(n,r){return t(),d("div",null,l)}const p=e(a,[["render",s],["__file","prometheus-promql-operators.html.vue"]]);export{p as default};