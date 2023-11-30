import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as n,d as t}from"./app-d7bHIUBF.js";const s="/prometheus-book/assets/remote-write-path-2-OsntxWy6.png",r="/prometheus-book/assets/remote_read_path-2-0715lCHf.png",a="/prometheus-book/assets/remote-storage-paths-t08hGoqC.png",d="/prometheus-book/assets/promethues-remote-storage-NBQHVBXe.png",l={},o=t('<h1 id="远程存储" tabindex="-1"><a class="header-anchor" href="#远程存储" aria-hidden="true">#</a> 远程存储</h1><p>Prometheus的本地存储设计可以减少其自身运维和管理的复杂度，同时能够满足大部分用户监控规模的需求。但是本地存储也意味着Prometheus无法持久化数据，无法存储大量历史数据，同时也无法灵活扩展和迁移。</p><p>为了保持Prometheus的简单性，Prometheus并没有尝试在自身中解决以上问题，而是通过定义两个标准接口(remote_write/remote_read)，让用户可以基于这两个接口对接将数据保存到任意第三方的存储服务中，这种方式在Prometheus中称为Remote Storage。</p><h2 id="remote-write" tabindex="-1"><a class="header-anchor" href="#remote-write" aria-hidden="true">#</a> Remote Write</h2><p>用户可以在Prometheus配置文件中指定Remote Write(远程写)的URL地址，一旦设置了该配置项，Prometheus将采集到的样本数据通过HTTP的形式发送给适配器(Adaptor)。而用户则可以在适配器中对接外部任意的服务。外部服务可以是真正的存储系统，公有云的存储服务，也可以是消息队列等任意形式。</p><figure><img src="'+s+'" alt="Remote Write" tabindex="0" loading="lazy"><figcaption>Remote Write</figcaption></figure><h2 id="remote-read" tabindex="-1"><a class="header-anchor" href="#remote-read" aria-hidden="true">#</a> Remote Read</h2><p>如下图所示，Prometheus的Remote Read(远程读)也通过了一个适配器实现。在远程读的流程当中，当用户发起查询请求后，Prometheus将向remote_read中配置的URL发起查询请求(matchers,ranges)，Adaptor根据请求条件从第三方存储服务中获取响应的数据。同时将数据转换为Prometheus的原始样本数据返回给Prometheus Server。</p><p>当获取到样本数据后，Prometheus在本地使用PromQL对样本数据进行二次处理。</p><blockquote><p>注意：启用远程读设置后，只在数据查询时有效，对于规则文件的处理，以及Metadata API的处理都只基于Prometheus本地存储完成。</p></blockquote><figure><img src="'+r+`" alt="Remote Read" tabindex="0" loading="lazy"><figcaption>Remote Read</figcaption></figure><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><p>Prometheus配置文件中添加remote_write和remote_read配置，其中url用于指定远程读/写的HTTP服务地址。如果该URL启动了认证则可以通过basic_auth进行安全认证配置。对于https的支持需要设定tls_concig。proxy_url主要用于Prometheus无法直接访问适配器服务的情况下。</p><p>remote_write和remote_read具体配置如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>remote_write:
    url: &lt;string&gt;
    [ remote_timeout: &lt;duration&gt; | default = 30s ]
    write_relabel_configs:
    [ - &lt;relabel_config&gt; ... ]
    basic_auth:
    [ username: &lt;string&gt; ]
    [ password: &lt;string&gt; ]
    [ bearer_token: &lt;string&gt; ]
    [ bearer_token_file: /path/to/bearer/token/file ]
    tls_config:
    [ &lt;tls_config&gt; ]
    [ proxy_url: &lt;string&gt; ]

remote_read:
    url: &lt;string&gt;
    required_matchers:
    [ &lt;labelname&gt;: &lt;labelvalue&gt; ... ]
    [ remote_timeout: &lt;duration&gt; | default = 30s ]
    [ read_recent: &lt;boolean&gt; | default = false ]
    basic_auth:
    [ username: &lt;string&gt; ]
    [ password: &lt;string&gt; ]
    [ bearer_token: &lt;string&gt; ]
    [ bearer_token_file: /path/to/bearer/token/file ]
    [ &lt;tls_config&gt; ]
    [ proxy_url: &lt;string&gt; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义remote-storage-adaptor" tabindex="-1"><a class="header-anchor" href="#自定义remote-storage-adaptor" aria-hidden="true">#</a> 自定义Remote Storage Adaptor</h2><p>实现自定义Remote Storage需要用户分别创建用于支持remote_read和remote_write的HTTP服务。</p><figure><img src="`+a+`" alt="Remote Storage" tabindex="0" loading="lazy"><figcaption>Remote Storage</figcaption></figure><p>当前Prometheus中Remote Storage相关的协议主要通过以下proto文件进行定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>syntax = &quot;proto3&quot;;
package prometheus;

option go_package = &quot;prompb&quot;;

import &quot;types.proto&quot;;

message WriteRequest {
  repeated prometheus.TimeSeries timeseries = 1;
}

message ReadRequest {
  repeated Query queries = 1;
}

message ReadResponse {
  // In same order as the request&#39;s queries.
  repeated QueryResult results = 1;
}

message Query {
  int64 start_timestamp_ms = 1;
  int64 end_timestamp_ms = 2;
  repeated prometheus.LabelMatcher matchers = 3;
}

message QueryResult {
  // Samples within a time series must be ordered by time.
  repeated prometheus.TimeSeries timeseries = 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下代码展示了一个简单的remote_write服务，创建用于接收remote_write的HTTP服务，将请求内容转换成WriteRequest后，用户就可以按照自己的需求进行后续的逻辑处理。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
	&quot;fmt&quot;
	&quot;io/ioutil&quot;
	&quot;net/http&quot;

	&quot;github.com/gogo/protobuf/proto&quot;
	&quot;github.com/golang/snappy&quot;
	&quot;github.com/prometheus/common/model&quot;

	&quot;github.com/prometheus/prometheus/prompb&quot;
)

func main() {
	http.HandleFunc(&quot;/receive&quot;, func(w http.ResponseWriter, r *http.Request) {
		compressed, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		reqBuf, err := snappy.Decode(nil, compressed)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var req prompb.WriteRequest
		if err := proto.Unmarshal(reqBuf, &amp;req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		for _, ts := range req.Timeseries {
			m := make(model.Metric, len(ts.Labels))
			for _, l := range ts.Labels {
				m[model.LabelName(l.Name)] = model.LabelValue(l.Value)
			}
			fmt.Println(m)

			for _, s := range ts.Samples {
				fmt.Printf(&quot;  %f %d\\n&quot;, s.Value, s.Timestamp)
			}
		}
	})

	http.ListenAndServe(&quot;:1234&quot;, nil)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用influxdb作为remote-storage" tabindex="-1"><a class="header-anchor" href="#使用influxdb作为remote-storage" aria-hidden="true">#</a> 使用Influxdb作为Remote Storage</h2><p>目前Prometheus社区也提供了部分对于第三方数据库的Remote Storage支持：</p><p>| 存储服务 | 支持模式 | |---------------- ---------|-------| | AppOptics | write | | Chronix | write | | Cortex: | read/write | | CrateDB | read/write| | Gnocchi | write| | Graphite | write| | InfluxDB | read/write| | OpenTSDB | write| | PostgreSQL/TimescaleDB: | read/write| | SignalFx | write|</p><p>这里将介绍如何使用Influxdb作为Prometheus的Remote Storage，从而确保当Prometheus发生宕机或者重启之后能够从Influxdb中恢复和获取历史数据。</p><p>这里使用docker-compose定义并启动Influxdb数据库服务，docker-compose.yml定义如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;2&#39;
services:
  influxdb:
    image: influxdb:1.3.5
    command: -config /etc/influxdb/influxdb.conf
    ports:
      - &quot;8086:8086&quot;
    environment:
      - INFLUXDB_DB=prometheus
      - INFLUXDB_ADMIN_ENABLED=true
      - INFLUXDB_ADMIN_USER=admin
      - INFLUXDB_ADMIN_PASSWORD=admin
      - INFLUXDB_USER=prom
      - INFLUXDB_USER_PASSWORD=prom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动influxdb服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker-compose up -d
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
795d0ead87a1        influxdb:1.3.5      &quot;/entrypoint.sh -c...&quot;   3 hours ago         Up 3 hours          0.0.0.0:8086-&gt;8086/tcp   localhost_influxdb_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取并启动Prometheus提供的Remote Storage Adapter：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get github.com/prometheus/prometheus/documentation/examples/remote_storage/remote_storage_adapter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>获取remote_storage_adapter源码后，go会自动把相关的源码编译成可执行文件，并且保存在$GOPATH/bin/目录下。</p><p>启动remote_storage_adapter并且设置Influxdb相关的认证信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>INFLUXDB_PW=prom $GOPATH/bin/remote_storage_adapter -influxdb-url=http://localhost:8086 -influxdb.username=prom -influxdb.database=prometheus -influxdb.retention-policy=autogen
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改prometheus.yml添加Remote Storage相关的配置内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>remote_write:
  - url: &quot;http://localhost:9201/write&quot;

remote_read:
  - url: &quot;http://localhost:9201/read&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动Prometheus能够获取数据后，登录到influxdb容器，并验证数据写入。如下所示，当数据能够正常写入Influxdb后可以看到Prometheus相关的指标。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker exec -it 795d0ead87a1 influx
Connected to http://localhost:8086 version 1.3.5
InfluxDB shell version: 1.3.5
&gt; auth
username: prom
password:

&gt; use prometheus
&gt; SHOW MEASUREMENTS
name: measurements
name
----
go_gc_duration_seconds
go_gc_duration_seconds_count
go_gc_duration_seconds_sum
go_goroutines
go_info
go_memstats_alloc_bytes
go_memstats_alloc_bytes_total
go_memstats_buck_hash_sys_bytes
go_memstats_frees_total
go_memstats_gc_cpu_fraction
go_memstats_gc_sys_bytes
go_memstats_heap_alloc_bytes
go_memstats_heap_idle_bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当数据写入成功后，停止Prometheus服务。同时删除Prometheus的data目录，模拟Prometheus数据丢失的情况后重启Prometheus。打开Prometheus UI如果配置正常，Prometheus可以正常查询到本地存储以删除的历史数据记录。</p><figure><img src="`+d+'" alt="从Remote Storage获取历史数据" tabindex="0" loading="lazy"><figcaption>从Remote Storage获取历史数据</figcaption></figure>',41),m=[o];function u(v,c){return i(),n("div",null,m)}const g=e(l,[["render",u],["__file","prometheus-remote-storage.html.vue"]]);export{g as default};
