import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as t,d as n}from"./app-d7bHIUBF.js";const l={},u=n(`<h1 id="在http-api中使用promql" tabindex="-1"><a class="header-anchor" href="#在http-api中使用promql" aria-hidden="true">#</a> 在HTTP API中使用PromQL</h1><p>Prometheus当前稳定的HTTP API可以通过/api/v1访问。</p><h2 id="api响应格式" tabindex="-1"><a class="header-anchor" href="#api响应格式" aria-hidden="true">#</a> API响应格式</h2><p>Prometheus API使用了JSON格式的响应内容。 当API调用成功后将会返回2xx的HTTP状态码。</p><p>反之，当API调用失败时可能返回以下几种不同的HTTP状态码：</p><ul><li>404 Bad Request：当参数错误或者缺失时。</li><li>422 Unprocessable Entity 当表达式无法执行时。</li><li>503 Service Unavailiable 当请求超时或者被中断时。</li></ul><p>所有的API请求均使用以下的JSON格式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;status&quot;: &quot;success&quot; | &quot;error&quot;,
  &quot;data&quot;: &lt;data&gt;,

  // Only set if status is &quot;error&quot;. The data field may still hold
  // additional data.
  &quot;errorType&quot;: &quot;&lt;string&gt;&quot;,
  &quot;error&quot;: &quot;&lt;string&gt;&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在http-api中使用promql-1" tabindex="-1"><a class="header-anchor" href="#在http-api中使用promql-1" aria-hidden="true">#</a> 在HTTP API中使用PromQL</h2><p>通过HTTP API我们可以分别通过/api/v1/query和/api/v1/query_range查询PromQL表达式当前或者一定时间范围内的计算结果。</p><h3 id="瞬时数据查询" tabindex="-1"><a class="header-anchor" href="#瞬时数据查询" aria-hidden="true">#</a> 瞬时数据查询</h3><p>通过使用QUERY API我们可以查询PromQL在特定时间点下的计算结果。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /api/v1/query
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>URL请求参数：</p><ul><li><code>query=&lt;string&gt;</code>：PromQL表达式。</li><li><code>time=&lt;rfc3339 | unix_timestamp&gt;</code>：用于指定用于计算PromQL的时间戳。可选参数，默认情况下使用当前系统时间。</li><li><code>timeout=&lt;duration&gt;</code>：超时设置。可选参数，默认情况下使用-query,timeout的全局设置。</li></ul><p>例如使用以下表达式查询表达式up在时间点2015-07-01T20:10:51.781Z的计算结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ curl &#39;http://localhost:9090/api/v1/query?query=up&amp;time=2015-07-01T20:10:51.781Z&#39;
{
   &quot;status&quot; : &quot;success&quot;,
   &quot;data&quot; : {
      &quot;resultType&quot; : &quot;vector&quot;,
      &quot;result&quot; : [
         {
            &quot;metric&quot; : {
               &quot;__name__&quot; : &quot;up&quot;,
               &quot;job&quot; : &quot;prometheus&quot;,
               &quot;instance&quot; : &quot;localhost:9090&quot;
            },
            &quot;value&quot;: [ 1435781451.781, &quot;1&quot; ]
         },
         {
            &quot;metric&quot; : {
               &quot;__name__&quot; : &quot;up&quot;,
               &quot;job&quot; : &quot;node&quot;,
               &quot;instance&quot; : &quot;localhost:9100&quot;
            },
            &quot;value&quot; : [ 1435781451.781, &quot;0&quot; ]
         }
      ]
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="响应数据类型" tabindex="-1"><a class="header-anchor" href="#响应数据类型" aria-hidden="true">#</a> 响应数据类型</h3><p>当API调用成功后，Prometheus会返回JSON格式的响应内容，格式如上小节所示。并且在data节点中返回查询结果。data节点格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;resultType&quot;: &quot;matrix&quot; | &quot;vector&quot; | &quot;scalar&quot; | &quot;string&quot;,
  &quot;result&quot;: &lt;value&gt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PromQL表达式可能返回多种数据类型，在响应内容中使用resultType表示当前返回的数据类型，包括：</p><ul><li>瞬时向量：vector</li></ul><p>当返回数据类型resultType为vector时，result响应格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[
  {
    &quot;metric&quot;: { &quot;&lt;label_name&gt;&quot;: &quot;&lt;label_value&gt;&quot;, ... },
    &quot;value&quot;: [ &lt;unix_time&gt;, &quot;&lt;sample_value&gt;&quot; ]
  },
  ...
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中metrics表示当前时间序列的特征维度，value只包含一个唯一的样本。</p><ul><li>区间向量：matrix</li></ul><p>当返回数据类型resultType为matrix时，result响应格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[
  {
    &quot;metric&quot;: { &quot;&lt;label_name&gt;&quot;: &quot;&lt;label_value&gt;&quot;, ... },
    &quot;values&quot;: [ [ &lt;unix_time&gt;, &quot;&lt;sample_value&gt;&quot; ], ... ]
  },
  ...
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中metrics表示当前时间序列的特征维度，values包含当前事件序列的一组样本。</p><ul><li>标量：scalar</li></ul><p>当返回数据类型resultType为scalar时，result响应格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[ &lt;unix_time&gt;, &quot;&lt;scalar_value&gt;&quot; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于标量不存在时间序列一说，因此result表示为当前系统时间一个标量的值。</p><ul><li>字符串：string</li></ul><p>当返回数据类型resultType为string时，result响应格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[ &lt;unix_time&gt;, &quot;&lt;string_value&gt;&quot; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字符串类型的响应内容格式和标量相同。</p><h3 id="区间数据查询" tabindex="-1"><a class="header-anchor" href="#区间数据查询" aria-hidden="true">#</a> 区间数据查询</h3><p>使用QUERY_RANGE API我们则可以直接查询PromQL表达式在一段时间返回内的计算结果。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /api/v1/query_range
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>URL请求参数：</p><ul><li><code>query=&lt;string&gt;</code>: PromQL表达式。</li><li><code>start=&lt;rfc3339 | unix_timestamp&gt;</code>: 起始时间。</li><li><code>end=&lt;rfc3339 | unix_timestamp&gt;</code>: 结束时间。</li><li><code>step=&lt;duration&gt;</code>: 查询步长。</li><li><code>timeout=&lt;duration&gt;</code>: 超时设置。可选参数，默认情况下使用-query,timeout的全局设置。</li></ul><p>当使用QUERY_RANGE API查询PromQL表达式时，返回结果一定是一个区间向量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;resultType&quot;: &quot;matrix&quot;,
  &quot;result&quot;: &lt;value&gt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>需要注意的是，在QUERY_RANGE API中PromQL只能使用瞬时向量选择器类型的表达式。</p></blockquote><p>例如使用以下表达式查询表达式up在30秒范围内以15秒为间隔计算PromQL表达式的结果。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ curl &#39;http://localhost:9090/api/v1/query_range?query=up&amp;start=2015-07-01T20:10:30.781Z&amp;end=2015-07-01T20:11:00.781Z&amp;step=15s&#39;
{
   &quot;status&quot; : &quot;success&quot;,
   &quot;data&quot; : {
      &quot;resultType&quot; : &quot;matrix&quot;,
      &quot;result&quot; : [
         {
            &quot;metric&quot; : {
               &quot;__name__&quot; : &quot;up&quot;,
               &quot;job&quot; : &quot;prometheus&quot;,
               &quot;instance&quot; : &quot;localhost:9090&quot;
            },
            &quot;values&quot; : [
               [ 1435781430.781, &quot;1&quot; ],
               [ 1435781445.781, &quot;1&quot; ],
               [ 1435781460.781, &quot;1&quot; ]
            ]
         },
         {
            &quot;metric&quot; : {
               &quot;__name__&quot; : &quot;up&quot;,
               &quot;job&quot; : &quot;node&quot;,
               &quot;instance&quot; : &quot;localhost:9091&quot;
            },
            &quot;values&quot; : [
               [ 1435781430.781, &quot;0&quot; ],
               [ 1435781445.781, &quot;0&quot; ],
               [ 1435781460.781, &quot;1&quot; ]
            ]
         }
      ]
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,47),s=[u];function a(d,r){return i(),t("div",null,s)}const c=e(l,[["render",a],["__file","prometheus-promql-with-http-api.html.vue"]]);export{c as default};
