import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as i,c as l,a as n,b as s,e as p,d as a}from"./app-tU1o2vQf.js";const c={},u=a(`<h1 id="在应用中内置prometheus支持" tabindex="-1"><a class="header-anchor" href="#在应用中内置prometheus支持" aria-hidden="true">#</a> 在应用中内置Prometheus支持</h1><p>本小节将以Spring Boot为例，介绍如何在应用代码中集成client_java。</p><p>添加Prometheus Java Client相关的依赖：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>
    compile <span class="token string">&#39;io.prometheus:simpleclient:0.0.24&#39;</span>
    compile <span class="token interpolation-string"><span class="token string">&quot;io.prometheus:simpleclient_spring_boot:0.0.24&quot;</span></span>
    compile <span class="token interpolation-string"><span class="token string">&quot;io.prometheus:simpleclient_hotspot:0.0.24&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过注解@EnablePrometheusEndpoint启用Prometheus Endpoint，这里同时使用了simpleclient_hotspot中提供的DefaultExporter。该Exporter会在metrics endpoint中统计当前应用JVM的相关信息：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnablePrometheusEndpoint</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringApplication</span> <span class="token keyword">implements</span> <span class="token class-name">CommandLineRunner</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">GatewayApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> strings<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">DefaultExports</span><span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下Prometheus暴露的metrics endpoint为 /prometheus，可以通过endpoint配置进行修改:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> metrics
  <span class="token key atrule">metrics</span><span class="token punctuation">:</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> springmetrics
    <span class="token key atrule">sensitive</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r={href:"http://localhost:8080/metrics",target:"_blank",rel:"noopener noreferrer"},d=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP jvm_gc_collection_seconds Time spent in a given JVM garbage collector in seconds.
# TYPE jvm_gc_collection_seconds summary
jvm_gc_collection_seconds_count{gc=&quot;PS Scavenge&quot;,} 11.0
jvm_gc_collection_seconds_sum{gc=&quot;PS Scavenge&quot;,} 0.18
jvm_gc_collection_seconds_count{gc=&quot;PS MarkSweep&quot;,} 2.0
jvm_gc_collection_seconds_sum{gc=&quot;PS MarkSweep&quot;,} 0.121
# HELP jvm_classes_loaded The number of classes that are currently loaded in the JVM
# TYPE jvm_classes_loaded gauge
jvm_classes_loaded 8376.0
# HELP jvm_classes_loaded_total The total number of classes that have been loaded since the JVM has started execution
# TYPE jvm_classes_loaded_total counter
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="添加拦截器-为监控埋点做准备" tabindex="-1"><a class="header-anchor" href="#添加拦截器-为监控埋点做准备" aria-hidden="true">#</a> 添加拦截器，为监控埋点做准备</h5><p>除了获取应用JVM相关的状态以外，我们还可能需要添加一些自定义的监控Metrics实现对系统性能，以及业务状态进行采集，以提供日后优化的相关支撑数据。首先我们使用拦截器处理对应用的所有请求。</p><p>继承WebMvcConfigurerAdapter类并复写addInterceptors方法，对所有请求/**添加拦截器</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnablePrometheusEndpoint</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringApplication</span> <span class="token keyword">extends</span> <span class="token class-name">WebMvcConfigurerAdapter</span> <span class="token keyword">implements</span> <span class="token class-name">CommandLineRunner</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PrometheusMetricsInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">&quot;/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PrometheusMetricsInterceptor继承自HandlerInterceptorAdapter，通过复写父方法preHandle和afterCompletion可以拦截一个HTTP请求生命周期的不同阶段：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrometheusMetricsInterceptor</span> <span class="token keyword">extends</span> <span class="token class-name">HandlerInterceptorAdapter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">preHandle</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterCompletion</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span> <span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">afterCompletion</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> handler<span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="自定义监控指标" tabindex="-1"><a class="header-anchor" href="#自定义监控指标" aria-hidden="true">#</a> 自定义监控指标</h5><p>一旦PrometheusMetricsInterceptor能够成功拦截和处理请求之后，我们就可以使用client java自定义多种监控指标。</p><p>计数器可以用于记录只会增加不会减少的指标类型，比如记录应用请求的总量(http_requests_total)，cpu使用时间(process_cpu_seconds_total)等。 一般而言，Counter类型的metrics指标在命名中我们使用_total结束。</p><p>使用Counter.build()创建Counter类型的监控指标，并且通过name()方法定义监控指标的名称，通过labelNames()定义该指标包含的标签。最后通过register()将该指标注册到Collector的defaultRegistry中中。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrometheusMetricsInterceptor</span> <span class="token keyword">extends</span> <span class="token class-name">HandlerInterceptorAdapter</span> <span class="token punctuation">{</span>

    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Counter</span> requestCounter <span class="token operator">=</span> <span class="token class-name">Counter</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;io_namespace_http_requests_total&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">labelNames</span><span class="token punctuation">(</span><span class="token string">&quot;path&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;method&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;code&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">help</span><span class="token punctuation">(</span><span class="token string">&quot;Total requests.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterCompletion</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span> <span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> requestURI <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> method <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> status <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        requestCounter<span class="token punctuation">.</span><span class="token function">labels</span><span class="token punctuation">(</span>requestURI<span class="token punctuation">,</span> method<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">inc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">afterCompletion</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> handler<span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在afterCompletion方法中，可以获取到当前请求的请求路径、请求方法以及状态码。 这里通过labels指定了当前样本各个标签对应的值，最后通过.inc()计数器+1：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>requestCounter.labels(requestURI, method, String.valueOf(status)).inc();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过指标io_namespace_http_requests_total我们可以实现：</p><ul><li>查询应用的请求总量</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># PromQL
sum(io_namespace_http_requests_total)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查询每秒Http请求量</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># PromQL
sum(rate(io_wise2c_gateway_requests_total[5m]))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查询当前应用请求量Top N的URI</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># PromQL
topk(10, sum(io_namespace_http_requests_total) by (path))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Gauge可以反映应用的__当前状态__,例如在监控主机时，主机当前空闲的内容大小(node_memory_MemFree)，可用内存大小(node_memory_MemAvailable)。或者容器当前的CPU使用率,内存使用率。这里我们使用Gauge记录当前应用正在处理的Http请求数量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class PrometheusMetricsInterceptor extends HandlerInterceptorAdapter {

    ...省略的代码
    static final Gauge inprogressRequests = Gauge.build()
            .name(&quot;io_namespace_http_inprogress_requests&quot;).labelNames(&quot;path&quot;, &quot;method&quot;)
            .help(&quot;Inprogress requests.&quot;).register();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        ...省略的代码
        // 计数器+1
        inprogressRequests.labels(requestURI, method).inc();
        return super.preHandle(request, response, handler);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        ...省略的代码
        // 计数器-1
        inprogressRequests.labels(requestURI, method).dec();

        super.afterCompletion(request, response, handler, ex);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过指标io_namespace_http_inprogress_requests我们可以直接查询应用当前正在处理中的Http请求数量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># PromQL
io_namespace_http_inprogress_requests{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Histogram主要用于在指定分布范围内(Buckets)记录大小(如http request bytes)或者事件发生的次数。以请求响应时间requests_latency_seconds为例。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class PrometheusMetricsInterceptor extends HandlerInterceptorAdapter {

    static final Histogram requestLatencyHistogram = Histogram.build().labelNames(&quot;path&quot;, &quot;method&quot;, &quot;code&quot;)
            .name(&quot;io_namespace_http_requests_latency_seconds_histogram&quot;).help(&quot;Request latency in seconds.&quot;)
            .register();

    private Histogram.Timer histogramRequestTimer;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        ...省略的代码
        histogramRequestTimer = requestLatencyHistogram.labels(requestURI, method, String.valueOf(status)).startTimer();
        ...省略的代码
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        ...省略的代码
        histogramRequestTimer.observeDuration();
        ...省略的代码
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Histogram会自动创建3个指标，分别为：</p><ul><li>事件发生总次数： basename_count</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 实际含义： 当前一共发生了2次http请求
io_namespace_http_requests_latency_seconds_histogram_count{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,} 2.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>所有事件产生值的大小的总和： basename_sum</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 实际含义： 发生的2次http请求总的响应时间为13.107670803000001 秒
io_namespace_http_requests_latency_seconds_histogram_sum{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,} 13.107670803000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,32),m=n("ul",null,[n("li",{le:"上包含"},"事件产生的值分布在bucket中的次数： basename_bucket")],-1),v=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 在总共2次请求当中。http请求响应时间 &lt;=0.005 秒 的请求次数为0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.005&quot;,} 0.0
# 在总共2次请求当中。http请求响应时间 &lt;=0.01 秒 的请求次数为0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.01&quot;,} 0.0
# 在总共2次请求当中。http请求响应时间 &lt;=0.025 秒 的请求次数为0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.025&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.05&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.075&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.1&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.25&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.5&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;0.75&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;1.0&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;2.5&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;5.0&quot;,} 0.0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;7.5&quot;,} 2.0
# 在总共2次请求当中。http请求响应时间 &lt;=10 秒 的请求次数为0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;10.0&quot;,} 2.0
# 在总共2次请求当中。http请求响应时间 10 秒 的请求次数为0
io_namespace_http_requests_latency_seconds_histogram_bucket{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,le=&quot;+Inf&quot;,} 2.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Summary和Histogram非常类型相似，都可以统计事件发生的次数或者发小，以及其分布情况。Summary和Histogram都提供了对于事件的计数_count以及值的汇总_sum。 因此使用_count,和_sum时间序列可以计算出相同的内容，例如http每秒的平均响应时间：rate(basename_sum[5m]) / rate(basename_count[5m])。同时Summary和Histogram都可以计算和统计样本的分布情况，比如中位数，9分位数等等。其中 0.0&lt;= 分位数Quantiles &lt;= 1.0。</p><p>不同在于Histogram可以通过histogram_quantile函数在服务器端计算分位数，而Sumamry的分位数则是直接在客户端进行定义。因此对于分位数的计算。 Summary在通过PromQL进行查询时有更好的性能表现，而Histogram则会消耗更多的资源。相对的对于客户端而言Histogram消耗的资源更少。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class PrometheusMetricsInterceptor extends HandlerInterceptorAdapter {

    static final Summary requestLatency = Summary.build()
            .name(&quot;io_namespace_http_requests_latency_seconds_summary&quot;)
            .quantile(0.5, 0.05)
            .quantile(0.9, 0.01)
            .labelNames(&quot;path&quot;, &quot;method&quot;, &quot;code&quot;)
            .help(&quot;Request latency in seconds.&quot;).register();


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        ...省略的代码
        requestTimer = requestLatency.labels(requestURI, method, String.valueOf(status)).startTimer();
        ...省略的代码
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        ...省略的代码
        requestTimer.observeDuration();
        ...省略的代码
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Summary指标，会自动创建多个时间序列：</p><ul><li>事件发生总的次数</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 含义：当前http请求发生总次数为12次
io_namespace_http_requests_latency_seconds_summary_count{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,} 12.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>事件产生的值的总和</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 含义：这12次http请求的总响应时间为 51.029495508s
io_namespace_http_requests_latency_seconds_summary_sum{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,} 51.029495508
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>事件产生的值的分布情况</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 含义：这12次http请求响应时间的中位数是3.052404983s
io_namespace_http_requests_latency_seconds_summary{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,quantile=&quot;0.5&quot;,} 3.052404983
# 含义：这12次http请求响应时间的9分位数是8.003261666s
io_namespace_http_requests_latency_seconds_summary{path=&quot;/&quot;,method=&quot;GET&quot;,code=&quot;200&quot;,quantile=&quot;0.9&quot;,} 8.003261666
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="使用collector暴露其它指标" tabindex="-1"><a class="header-anchor" href="#使用collector暴露其它指标" aria-hidden="true">#</a> 使用Collector暴露其它指标</h5><p>除了在拦截器中使用Prometheus提供的Counter,Summary,Gauage等构造监控指标以外，我们还可以通过自定义的Collector实现对相关业务指标的暴露。例如，我们可以通过自定义Collector直接从应用程序的数据库中统计监控指标.</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@SpringBootApplication
@EnablePrometheusEndpoint
public class SpringApplication extends WebMvcConfigurerAdapter implements CommandLineRunner {

    @Autowired
    private CustomExporter customExporter;

    ...省略的代码

    @Override
    public void run(String... args) throws Exception {
        ...省略的代码
        customExporter.register();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CustomExporter继承自io.prometheus.client.Collector，在调用Collector的register()方法后，当访问/metrics时，则会自动从Collector的collection()方法中获取采集到的监控指标。</p><p>由于这里CustomExporter存在于Spring的IOC容器当中，这里可以直接访问业务代码，返回需要的业务相关的指标。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>prometheus<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">Collector</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>prometheus<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">GaugeMetricFamily</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Collections</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomExporter</span> <span class="token keyword">extends</span> <span class="token class-name">Collector</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MetricFamilySamples</span><span class="token punctuation">&gt;</span></span> <span class="token function">collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MetricFamilySamples</span><span class="token punctuation">&gt;</span></span> mfs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        # 创建metrics指标
        <span class="token class-name">GaugeMetricFamily</span> labeledGauge <span class="token operator">=</span>
                <span class="token keyword">new</span> <span class="token class-name">GaugeMetricFamily</span><span class="token punctuation">(</span><span class="token string">&quot;io_namespace_custom_metrics&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;custom metrics&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">&quot;labelname&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        # 设置指标的label以及value
        labeledGauge<span class="token punctuation">.</span><span class="token function">addMetric</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">&quot;labelvalue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        mfs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>labeledGauge<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> mfs<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里也可以使用CounterMetricFamily，SummaryMetricFamily声明其它的指标类型。</p>`,18);function k(b,q){const e=o("ExternalLinkIcon");return i(),l("div",null,[u,n("p",null,[s("启动应用程序访问"),n("a",r,[s("http://localhost:8080/metrics"),p(e)]),s("可以看到以下输出内容：")]),d,m,v])}const g=t(c,[["render",k],["__file","custom_app_support_prometheus.html.vue"]]);export{g as default};
