import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as l,c,a as s,b as n,e,d as t}from"./app-d7bHIUBF.js";const p="/prometheus-book/assets/prometheus_client_java_2-GO_dOt1J.png",u="/prometheus-book/assets/custom_collector-GT0qrFh-.png",r={},d=s("h1",{id:"client-java",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#client-java","aria-hidden":"true"},"#"),n(" client_java")],-1),v={href:"https://github.com/prometheus/client_java",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/prometheus/client_java",target:"_blank",rel:"noopener noreferrer"},k=t(`<h2 id="初识client-java" tabindex="-1"><a class="header-anchor" href="#初识client-java" aria-hidden="true">#</a> 初识client_java</h2><p>你可以根据自己的喜好使用Maven或者Gradle创建应用程序，在本书中将以Gradle为例。</p><p>添加Prometheus client_java依赖包，在build.gradle中添加依赖，如下：</p><div class="language-build.gradle line-numbers-mode" data-ext="build.gradle"><pre class="language-build.gradle"><code># 省略其它gradle配置
dependencies {
    compile &quot;io.prometheus:simpleclient:0.3.0&quot;
    compile &quot;io.prometheus:simpleclient_hotspot:0.3.0&quot;
    compile &quot;io.prometheus:simpleclient_httpserver:0.3.0&quot;
    compile &quot;io.prometheus:simpleclient_pushgateway:0.3.0&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中simpleclient是对Prometheus集成的核心依赖，simpleclient_hotspot是对Hotspot JVM相关监控数据采集的实现。simpleclient_httpserver中提供的一个简单的能够处理Prometheus监控请求的HTTP服务器实现。simpleclient_pushgateway则提供了与PushGateway的对接支持。</p><p>使用simpleclient_http创建一个简单的HTTPServer。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.github.prometheus.samples;

import io.prometheus.client.exporter.HTTPServer;
import io.prometheus.client.hotspot.DefaultExports;

import java.io.IOException;

public class Server {

    public static void main(String[] args) throws IOException {
        DefaultExports.initialize();
        new HTTPServer(1234);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),b={href:"http://localhost:1234/metrics",target:"_blank",rel:"noopener noreferrer"},g=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP jvm_info JVM version info
# TYPE jvm_info gauge
jvm_info{version=&quot;1.8.0_51-b16&quot;,vendor=&quot;Oracle Corporation&quot;,runtime=&quot;Java(TM) SE Runtime Environment&quot;,} 1.0
# HELP jvm_gc_collection_seconds Time spent in a given JVM garbage collector in seconds.
# TYPE jvm_gc_collection_seconds summary
jvm_gc_collection_seconds_count{gc=&quot;PS Scavenge&quot;,} 0.0
jvm_gc_collection_seconds_sum{gc=&quot;PS Scavenge&quot;,} 0.0
jvm_gc_collection_seconds_count{gc=&quot;PS MarkSweep&quot;,} 0.0
jvm_gc_collection_seconds_sum{gc=&quot;PS MarkSweep&quot;,} 0.0
# HELP jvm_buffer_pool_used_bytes Used bytes of a given JVM buffer pool.
# TYPE jvm_buffer_pool_used_bytes gauge
jvm_buffer_pool_used_bytes{pool=&quot;direct&quot;,} 8192.0
jvm_buffer_pool_used_bytes{pool=&quot;mapped&quot;,} 0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>恭喜你，已经成功完成了你的第一个Exporter程序。这里返回的是当前应用中JVM相关的监控指标，包括JVM中GC，Memory Pool，JMX, Classloading，以及线程数等监控统计信息。</p><h2 id="client-java的实现过程" tabindex="-1"><a class="header-anchor" href="#client-java的实现过程" aria-hidden="true">#</a> client_java的实现过程</h2><p>查看DefaultExports.initialize()中的实现代码，可以看到类似于如下代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DefaultExports</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> initialized <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>initialized<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">new</span> <span class="token class-name">StandardExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">new</span> <span class="token class-name">MemoryPoolsExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">new</span> <span class="token class-name">BufferPoolsExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">new</span> <span class="token class-name">GarbageCollectorExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">new</span> <span class="token class-name">ThreadExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">new</span> <span class="token class-name">ClassLoadingExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">new</span> <span class="token class-name">VersionInfoExports</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      initialized <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里所有的Exporters都继承自Collector，并且实现collect()方法，用于返回该Collector中获取到的所有监控指标和样本数据。而register()方法，会将该Collector自己注册到CollectorRegistry.defaultRegistry中。</p><p>HTTPServer中则创建了一个HTTPMetricHandler用于来处理Prometheus抓取监控样本数据的请求：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> server <span class="token operator">=</span> <span class="token class-name">HttpServer</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        server<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HttpHandler</span> mHandler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HTTPMetricHandler</span><span class="token punctuation">(</span>registry<span class="token punctuation">)</span><span class="token punctuation">;</span>
        server<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> mHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
        server<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token string">&quot;/metrics&quot;</span><span class="token punctuation">,</span> mHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
        executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">DaemonThreadFactory</span><span class="token punctuation">.</span><span class="token function">defaultThreadFactory</span><span class="token punctuation">(</span>daemon<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        server<span class="token punctuation">.</span><span class="token function">setExecutor</span><span class="token punctuation">(</span>executorService<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">start</span><span class="token punctuation">(</span>daemon<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HTTPMetricHandler主要负责响应Prometheus Server向该Exporter发起的请求。通过从CollectorRegistry.defaultRegistry中所有的Collector实例的collect()方法中获取样本数据，并对样本数据进行格式化，从而将监控样本返回给Prometheus Server:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">HttpExchange</span> t<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> query <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRawQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">ByteArrayOutputStream</span> response <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">OutputStreamWriter</span> osw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OutputStreamWriter</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TextFormat</span><span class="token punctuation">.</span><span class="token function">write004</span><span class="token punctuation">(</span>osw<span class="token punctuation">,</span>
                    registry<span class="token punctuation">.</span><span class="token function">filteredMetricFamilySamples</span><span class="token punctuation">(</span><span class="token function">parseQuery</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            osw<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            osw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            t<span class="token punctuation">.</span><span class="token function">getResponseHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span>
                    <span class="token class-name">TextFormat</span><span class="token punctuation">.</span><span class="token constant">CONTENT_TYPE_004</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            t<span class="token punctuation">.</span><span class="token function">getResponseHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Length&quot;</span><span class="token punctuation">,</span>
                    <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldUseCompression</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                t<span class="token punctuation">.</span><span class="token function">getResponseHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Encoding&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;gzip&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                t<span class="token punctuation">.</span><span class="token function">sendResponseHeaders</span><span class="token punctuation">(</span><span class="token class-name">HttpURLConnection</span><span class="token punctuation">.</span><span class="token constant">HTTP_OK</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">final</span> <span class="token class-name">GZIPOutputStream</span> os <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GZIPOutputStream</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">getResponseBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                response<span class="token punctuation">.</span><span class="token function">writeTo</span><span class="token punctuation">(</span>os<span class="token punctuation">)</span><span class="token punctuation">;</span>
                os<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                t<span class="token punctuation">.</span><span class="token function">sendResponseHeaders</span><span class="token punctuation">(</span><span class="token class-name">HttpURLConnection</span><span class="token punctuation">.</span><span class="token constant">HTTP_OK</span><span class="token punctuation">,</span> response<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                response<span class="token punctuation">.</span><span class="token function">writeTo</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">getResponseBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            t<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里以GarbageCollectorExports为例，collect()方法会从java.lang.management中获取到GC回收相关的运行数据，并且转换为SummaryMetricFamily：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.prometheus.client.hotspot;

import io.prometheus.client.Collector;
import io.prometheus.client.SummaryMetricFamily;

import java.lang.management.GarbageCollectorMXBean;
import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GarbageCollectorExports extends Collector {
  private final List&lt;GarbageCollectorMXBean&gt; garbageCollectors;

  public GarbageCollectorExports() {
    this(ManagementFactory.getGarbageCollectorMXBeans());
  }

  GarbageCollectorExports(List&lt;GarbageCollectorMXBean&gt; garbageCollectors) {
    this.garbageCollectors = garbageCollectors;
  }

  public List&lt;MetricFamilySamples&gt; collect() {
    SummaryMetricFamily gcCollection = new SummaryMetricFamily(
        &quot;jvm_gc_collection_seconds&quot;,
        &quot;Time spent in a given JVM garbage collector in seconds.&quot;,
        Collections.singletonList(&quot;gc&quot;));
    for (final GarbageCollectorMXBean gc : garbageCollectors) {
        gcCollection.addMetric(
            Collections.singletonList(gc.getName()),
            gc.getCollectionCount(),
            gc.getCollectionTime() / MILLISECONDS_PER_SECOND);
    }
    List&lt;MetricFamilySamples&gt; mfs = new ArrayList&lt;MetricFamilySamples&gt;();
    mfs.add(gcCollection);
    return mfs;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下图描述了一下通过Prometheus Java Client中HTTP Server对获取监控样本请求的处理过程。</p><figure><img src="`+p+'" alt="处理流程" tabindex="0" loading="lazy"><figcaption>处理流程</figcaption></figure><p>除了使用Prometheus提供的HttpServer以外，Prometheus提供了针对Servlet，Spring Boot, Spring Web以及Dropwizard等的实现。可以让用户快速实现已有应用程序与Prometheus的集成。</p><h2 id="自定义collector" tabindex="-1"><a class="header-anchor" href="#自定义collector" aria-hidden="true">#</a> 自定义Collector</h2><p>在上面的例子中，已经了解过simpleclient_hotspot是如果实现对JVM相关运行指标的监控的。通过添加自定义的Collector，用户可以轻松实现对外部系统（或者服务）的监控数据收集。</p><figure><img src="'+u+`" alt="使用自定义Collector监控第三方监控指标" tabindex="0" loading="lazy"><figcaption>使用自定义Collector监控第三方监控指标</figcaption></figure><p>以下代码，演示了如何在Exporter中创建自定义Collector:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class YourCustomCollector extends Collector {
  List&lt;MetricFamilySamples&gt; collect() {
    List&lt;MetricFamilySamples&gt; mfs = new ArrayList&lt;MetricFamilySamples&gt;();
    // With no labels.
    mfs.add(new GaugeMetricFamily(&quot;my_gauge&quot;, &quot;help&quot;, 42));
    // With labels
    GaugeMetricFamily labeledGauge = new GaugeMetricFamily(&quot;my_other_gauge&quot;, &quot;help&quot;, Arrays.asList(&quot;labelname&quot;));
    labeledGauge.addMetric(Arrays.asList(&quot;foo&quot;), 4);
    labeledGauge.addMetric(Arrays.asList(&quot;bar&quot;), 5);
    mfs.add(labeledGauge);
    return mfs;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现Collector后通过register()方法，将其注册到CollectorRegistry中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Registration
static final YourCustomCollector requests = new YourCustomCollector().register()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>除了GaugeMetricFamily以外，client_java中该提供了对CounterMetricFamily以及SummaryMetricFamily等针对其它监控指标类型的支持。</p><h2 id="直接在代码中集成" tabindex="-1"><a class="header-anchor" href="#直接在代码中集成" aria-hidden="true">#</a> 直接在代码中集成</h2><p>除了通过实现Collector接口以外，Prometheus的Java Client还内置了多种类型构造器，如Counter、Gauge、Histogram、Summary等。 通过这些构造器，用户可以直接在业务代码中实现监控样本收集，从而可以监控程序的内部运行情况。</p><p>Counter是对client_java中对Collector的一个针对计数器类型指标的封装。对于Counter而言只有一个.inc()方法用于计数+1。 例如，当需要统计对某些特定方法调用次数的统计时，可以通过以下方式实现：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import io.prometheus.client.Counter;
class YourClass {
  static final Counter requests = Counter.build()
     .name(&quot;requests_total&quot;).help(&quot;Total requests.&quot;).register();
  
  void processRequest() {
    requests.inc();
    // Your code here.
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Gauge是一个可增可减的仪表盘，可以通过.inc()和.dec()对样本数据进行+1或者-1。例如，可以通过Gauge统计函数中某个方法正在处理中的调用次数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class YourClass {
  static final Gauge inprogressRequests = Gauge.build()
     .name(&quot;inprogress_requests&quot;).help(&quot;Inprogress requests.&quot;).register();
  
  void processRequest() {
    inprogressRequest.inc();
    // Your code here.
    inprogressRequest.dec();
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Histogram是一个自带buckets区间的用于统计分布的对象，主要用于在指定分布范围内(Buckets)记录大小或者事件发生的次数。通过构造Histogram可以记录某个方法的处理时间在Buckets上的分布情况。默认的Buckets范围为{.005, .01, .025, .05, .075, .1, .25, .5, .75, 1, 2.5, 5, 7.5, 10}。如果需要覆盖默认的buckets，可以使用.buckets(double… buckets)覆盖。以下代码会自动统计请求的响应时间以及请求的数据量在Buckets下的分布情况。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class YourClass {

 static final Histogram receivedBytes = Histogram.build()
     .name(&quot;requests_size_bytes&quot;).help(&quot;Request size in bytes.&quot;).register();

  static final Histogram requestLatency = Histogram.build()
     .name(&quot;requests_latency_seconds&quot;).help(&quot;Request latency in seconds.&quot;).register();

  void processRequest(Request req) {
    Histogram.Timer requestTimer = requestLatency.startTimer();
    try {
      // Your code here.
    } finally {
      requestTimer.observeDuration();
      receivedBytes.observe(req.size())
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Summary与Histogram非常类似，都可以完成对事件发生次数或者大小分布情况的统计。区别在于Summary直接在客户端完成了分位数的统计和计算,通过quantile()方法可以指定需要计算的分位数。以下代码会自动计算当前请求延迟和请求量大小的中位数以及9分位数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class YourClass {
  static final Summary receivedBytes = Summary.build()
     .quantile(0.5, 0.05)
     .quantile(0.9, 0.01)
     .name(&quot;requests_size_bytes&quot;).help(&quot;Request size in bytes.&quot;).register();
  static final Summary requestLatency = Summary.build()
     .quantile(0.5, 0.05)
     .quantile(0.9, 0.01)
     .name(&quot;requests_latency_seconds&quot;).help(&quot;Request latency in seconds.&quot;).register();
  
  void processRequest(Request req) {
    Summary.Timer requestTimer = requestLatency.startTimer();
    try {
      // Your code here.
    } finally {
      receivedBytes.observe(req.size());
      requestTimer.observeDuration();
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上的例子，我们简单了解了通过实现Collector或者使用Counter、Guage这样的构造器均可实现自定义监控指标，并且将相应的指标样本返回给Prometheus。 接下来，将以一个具体的例子详细讲解如何在应用中实现对Prometheus的集成。</p>`,34);function h(_,f){const a=o("ExternalLinkIcon");return l(),c("div",null,[d,s("p",null,[n("为了方便用户集成，Prometheus提供了多种Client Library。通过这些Client Library用户可以创建自定义的Exporter程序，也可以直接在业务系统中集成对Prometheus的支持。 这一小节中，我们将学习如何使用Prometheus官方提供的"),s("a",v,[n("client_java"),e(a)]),n("创建Exporter程序。")]),s("p",null,[n("这部分我们将带领读者学习Prometheus社区提供的client_java（"),s("a",m,[n("Github地址"),e(a)]),n("）的基本用法，并基于它实现一个简单的Exporter程序。")]),k,s("p",null,[n("运行main函数，并且访问"),s("a",b,[n("http://localhost:1234/metrics"),e(a)]),n("，可以在网页中看到以下内容。")]),g])}const x=i(r,[["render",h],["__file","custom_metrics_with_java_sdk.html.vue"]]);export{x as default};
