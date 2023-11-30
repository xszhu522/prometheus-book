import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as t,c as d,a as s,b as e,e as r,d as n}from"./app-NWC4HiYT.js";const o="/prometheus-book/assets/mysqld_exporter_target_stats-VWR4fG_R.png",u={},c=n(`<h1 id="监控mysql运行状态-mysqld-exporter" tabindex="-1"><a class="header-anchor" href="#监控mysql运行状态-mysqld-exporter" aria-hidden="true">#</a> 监控MySQL运行状态：MySQLD Exporter</h1><p>MySQL是一个关系型数据库管理系统，由瑞典MySQL AB公司开发，目前属于Oracle旗下的产品。 MySQL是最流行的关系型数据库管理系统之一。数据库的稳定运行是保证业务可用性的关键因素之一。这一小节当中将介绍如何使用Prometheus提供的MySQLD Exporter实现对MySQL数据库性能以及资源利用率的监控和度量。</p><h2 id="部署mysqld-exporter" tabindex="-1"><a class="header-anchor" href="#部署mysqld-exporter" aria-hidden="true">#</a> 部署MySQLD Exporter</h2><p>为了简化测试环境复杂度，这里使用Docker Compose定义并启动MySQL以及MySQLD Exporter：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3&#39;
services:
  mysql:
    image: mysql:5.7
    ports:
      - &quot;3306:3306&quot;
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=database
  mysqlexporter:
    image: prom/mysqld-exporter
    ports:
      - &quot;9104:9104&quot;
    environment:
      - DATA_SOURCE_NAME=root:password@(mysql:3306)/database
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里通过环境变量DATA_SOURCE_NAME方式定义监控目标。使用Docker Compose启动测试用的MySQL实例以及MySQLD Exporter:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动完成后，可以通过以下命令登录到MySQL容器当中，并执行MySQL相关的指令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker exec -it &lt;mysql_container_id&gt; mysql -uroot -ppassword
mysql&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,9),m={href:"http://localhost:9104",target:"_blank",rel:"noopener noreferrer"},p=n(`<p>可以通过/metrics查看mysql_up指标判断当前MySQLD Exporter是否正常连接到了MySQL实例，当指标值为1时表示能够正常获取监控数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP mysql_up Whether the MySQL server is up.
# TYPE mysql_up gauge
mysql_up 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改Prometheus配置文件/etc/prometheus/prometheus.yml，增加对MySQLD Exporter实例的采集任务配置:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- job_name: mysqld
  static_configs:
  - targets:
    - localhost:9104
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动Prometheus:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/data/prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过Prometheus的状态页，可以查看当前Target的状态：</p><figure><img src="`+o+`" alt="MySQLD Exporter实例状态" tabindex="0" loading="lazy"><figcaption>MySQLD Exporter实例状态</figcaption></figure><p>为了确保数据库的稳定运行，通常会关注一下四个与性能和资源利用率相关的指标：查询吞吐量、连接情况、缓冲池使用情况以及查询执行性能等。</p><h2 id="监控数据库吞吐量" tabindex="-1"><a class="header-anchor" href="#监控数据库吞吐量" aria-hidden="true">#</a> 监控数据库吞吐量</h2><p>对于数据库而言，最重要的工作就是实现对数据的增、删、改、查。为了衡量数据库服务器当前的吞吐量变化情况。在MySQL内部通过一个名为Questions的计数器，当客户端发送一个查询语句后，其值就会+1。可以通过以下MySQL指令查询Questions等服务器状态变量的值：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql<span class="token operator">&gt;</span> SHOW GLOBAL STATUS LIKE <span class="token string">&quot;Questions&quot;</span><span class="token punctuation">;</span>
+---------------+-------+
<span class="token operator">|</span> Variable_name <span class="token operator">|</span> Value <span class="token operator">|</span>
+---------------+-------+
<span class="token operator">|</span> Questions     <span class="token operator">|</span> <span class="token number">1326</span>  <span class="token operator">|</span>
+---------------+-------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQLD Exporter中返回的样本数据中通过mysql_global_status_questions反映当前Questions计数器的大小：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP mysql_global_status_questions Generic metric from SHOW GLOBAL STATUS.
# TYPE mysql_global_status_questions untyped
mysql_global_status_questions 1016
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以下PromQL可以查看当前MySQL实例查询速率的变化情况，查询数量的突变往往暗示着可能发生了某些严重的问题，因此用于用户应该关注并且设置响应的告警规则，以及时获取该指标的变化情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rate(mysql_global_status_questions[2m])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一般还可以从监控读操作和写操作的执行情况进行判断。通过MySQL全局状态中的Com_select可以查询到当前服务器执行查询语句的总次数：相应的，也可以通过Com_insert、Com_update以及Com_delete的总量衡量当前服务器写操作的总次数，例如，可以通过以下指令查询当前MySQL实例insert语句的执行次数总量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql<span class="token operator">&gt;</span> SHOW GLOBAL STATUS LIKE <span class="token string">&quot;Com_insert&quot;</span><span class="token punctuation">;</span>
+---------------+-------+
<span class="token operator">|</span> Variable_name <span class="token operator">|</span> Value <span class="token operator">|</span>
+---------------+-------+
<span class="token operator">|</span> Com_insert    <span class="token operator">|</span> <span class="token number">0</span>     <span class="token operator">|</span>
+---------------+-------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从MySQLD Exporter的/metrics返回的监控样本中，可以通过global_status_commands_total获取当前实例各类指令执行的次数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP mysql_global_status_commands_total Total number of executed MySQL commands.
# TYPE mysql_global_status_commands_total counter
mysql_global_status_commands_total{command=&quot;admin_commands&quot;} 0
mysql_global_status_commands_total{command=&quot;alter_db&quot;} 0
mysql_global_status_commands_total{command=&quot;alter_db_upgrade&quot;} 0
mysql_global_status_commands_total{command=&quot;select&quot;} 10
mysql_global_status_commands_total{command=&quot;insert&quot;} 2
mysql_global_status_commands_total{command=&quot;update&quot;} 2
mysql_global_status_commands_total{command=&quot;delete&quot;} 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户可以通过以下PromQL查看当前MySQL实例写操作速率的变化情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sum(rate(mysql_global_status_commands_total{command=~&quot;insert|update|delete&quot;}[2m])) without (command)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="连接情况" tabindex="-1"><a class="header-anchor" href="#连接情况" aria-hidden="true">#</a> 连接情况</h2><p>在MySQL中通过全局设置max_connections限制了当前服务器允许的最大客户端连接数量。一旦可用连接数被用尽，新的客户端连接都会被直接拒绝。 因此当监控MySQL运行状态时，需要时刻关注MySQL服务器的连接情况。用户可以通过以下指令查看当前MySQL服务的max_connections配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql<span class="token operator">&gt;</span> SHOW VARIABLES LIKE <span class="token string">&#39;max_connections&#39;</span><span class="token punctuation">;</span>
+-----------------+-------+
<span class="token operator">|</span> Variable_name   <span class="token operator">|</span> Value <span class="token operator">|</span>
+-----------------+-------+
<span class="token operator">|</span> max_connections <span class="token operator">|</span> <span class="token number">151</span>   <span class="token operator">|</span>
+-----------------+-------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQL默认的最大链接数为151。临时调整最大连接数，可以通过以下指令进行设置：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET GLOBAL max_connections = 200;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想永久化设置，则需要通过修改MySQL配置文件my.cnf，添加以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>max_connections = 200
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过Global Status中的Threads_connected、Aborted_connects、Connection_errors_max_connections以及Threads_running可以查看当前MySQL实例的连接情况。</p><p>例如，通过以下指令可以直接当前MySQL实例的连接数：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SHOW GLOBAL STATUS LIKE &quot;Threads_connected&quot;;
+-------------------+-------+
| Variable_name     | Value |
+-------------------+-------+
| Threads_connected | 1     |
+-------------------+-------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当所有可用连接都被占用时，如果一个客户端尝试连接至MySQL，会出现“Too many connections(连接数过多)”错误，同时Connection_errors_max_connections的值也会增加。为了防止出现此类情况，你应该监控可用连接的数量，并确保其值保持在max_connections限制以内。同时如果Aborted_connects的数量不断增加时，说明客户端尝试连接到MySQL都失败了。此时可以通过Connection_errors_max_connections以及Connection_errors_internal分析连接失败的问题原因。</p><p>下面列举了与MySQL连接相关的监控指标：</p><ul><li>mysql_global_variables_max_connections： 允许的最大连接数；</li><li>mysql_global_status_threads_connected： 当前开放的连接；</li><li>mysql_global_status_threads_running：当前开放的连接；</li><li>mysql_global_status_aborted_connects：当前开放的连接；</li><li>mysql_global_status_connection_errors_total{error=&quot;max_connections&quot;}：由于超出最大连接数导致的错误；</li><li>mysql_global_status_connection_errors_total{error=&quot;internal&quot;}：由于系统内部导致的错误；</li></ul><p>通过PromQL查询当前剩余的可用连接数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql_global_variables_max_connections - mysql_global_status_threads_connected
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用PromQL查询当前MySQL实例连接拒绝数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql_global_status_aborted_connects
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="监控缓冲池使用情况" tabindex="-1"><a class="header-anchor" href="#监控缓冲池使用情况" aria-hidden="true">#</a> 监控缓冲池使用情况</h2><p>MySQL默认的存储引擎InnoDB使用了一片称为缓冲池的内存区域，用于缓存数据表以及索引的数据。 当缓冲池的资源使用超出限制后，可能会导致数据库性能的下降，同时很多查询命令会直接在磁盘中执行，导致磁盘I/O不断攀升。 因此，应该关注MySQL缓冲池的资源使用情况，并且在合理的时间扩大缓冲池的大小可以优化数据库的性能。</p><p>Innodb_buffer_pool_pages_total反映了当前缓冲池中的内存页的总页数。可以通过以下指令查看：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; SHOW GLOBAL STATUS LIKE &quot;Innodb_buffer_pool_pages_total&quot;;
+--------------------------------+-------+
| Variable_name                  | Value |
+--------------------------------+-------+
| Innodb_buffer_pool_pages_total | 8191  |
+--------------------------------+-------+
1 row in set (0.02 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQLD Exporter通过以下指标返回缓冲池中各类内存页的数量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP mysql_global_status_buffer_pool_pages Innodb buffer pool pages by state.
# TYPE mysql_global_status_buffer_pool_pages gauge
mysql_global_status_buffer_pool_pages{state=&quot;data&quot;} 516
mysql_global_status_buffer_pool_pages{state=&quot;dirty&quot;} 0
mysql_global_status_buffer_pool_pages{state=&quot;free&quot;} 7675
mysql_global_status_buffer_pool_pages{state=&quot;misc&quot;} 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Innodb_buffer_pool_read_requests记录了正常从缓冲池读取数据的请求数量。可以通过以下指令查看：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; SHOW GLOBAL STATUS LIKE &quot;Innodb_buffer_pool_read_requests&quot;;
+----------------------------------+--------+
| Variable_name                    | Value  |
+----------------------------------+--------+
| Innodb_buffer_pool_read_requests | 797023 |
+----------------------------------+--------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQLD Exporter通过以下指标返回缓冲池中Innodb_buffer_pool_read_requests的值：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP mysql_global_status_innodb_buffer_pool_read_requests Generic metric from SHOW GLOBAL STATUS.
# TYPE mysql_global_status_innodb_buffer_pool_read_requests untyped
mysql_global_status_innodb_buffer_pool_read_requests 736711
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当缓冲池无法满足时，MySQL只能从磁盘中读取数据。Innodb_buffer_pool_reads即记录了从磁盘读取数据的请求数量。通常来说从内存中读取数据的速度要比从磁盘中读取快很多，因此，如果Innodb_buffer_pool_reads的值开始增加，可能意味着数据库的性能有问题。 可以通过以下只能查看Innodb_buffer_pool_reads的数量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; SHOW GLOBAL STATUS LIKE &quot;Innodb_buffer_pool_reads&quot;;
+--------------------------+-------+
| Variable_name            | Value |
+--------------------------+-------+
| Innodb_buffer_pool_reads | 443   |
+--------------------------+-------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在MySQLD Exporter中可以通过以下指标查看Innodb_buffer_pool_reads的数量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP mysql_global_status_innodb_buffer_pool_reads Generic metric from SHOW GLOBAL STATUS.
# TYPE mysql_global_status_innodb_buffer_pool_reads untyped
mysql_global_status_innodb_buffer_pool_reads 443
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上监控指标，以及实际监控的场景，我们可以利用PromQL快速建立多个监控项。</p><p>通过以下PromQL可以得到各个MySQL实例的缓冲池利用率。一般来说还需要结合Innodb_buffer_pool_reads的增长率情况来判断缓冲池大小是否合理：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(sum(mysql_global_status_buffer_pool_pages) by (instance) - sum(mysql_global_status_buffer_pool_pages{state=&quot;free&quot;}) by (instance)) / sum(mysql_global_status_buffer_pool_pages) by (instance)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以通过以下PromQL计算2分钟内磁盘读取请求次数的增长率的变化情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rate(mysql_global_status_innodb_buffer_pool_reads[2m])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查询性能" tabindex="-1"><a class="header-anchor" href="#查询性能" aria-hidden="true">#</a> 查询性能</h2><p>MySQL还提供了一个Slow_queries的计数器，当查询的执行时间超过long_query_time的值后，计数器就会+1，其默认值为10秒，可以通过以下指令在MySQL中查询当前long_query_time的设置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; SHOW VARIABLES LIKE &#39;long_query_time&#39;;
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以下指令可以查看当前MySQL实例中Slow_queries的数量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; SHOW GLOBAL STATUS LIKE &quot;Slow_queries&quot;;
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| Slow_queries  | 0     |
+---------------+-------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQLD Exporter返回的样本数据中，通过以下指标展示当前的Slow_queries的值：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP mysql_global_status_slow_queries Generic metric from SHOW GLOBAL STATUS.
# TYPE mysql_global_status_slow_queries untyped
mysql_global_status_slow_queries 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过监控Slow_queries的增长率，可以反映出当前MySQL服务器的性能状态，可以通过以下PromQL查询Slow_queries的增长情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rate(mysql_global_status_slow_queries[2m])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在MySQL中还可以通过安装response time插件，从而支持记录查询时间区间的统计信息。启动该功能后MySQLD Exporter也会自动获取到相关数据，从而可以细化MySQL查询响应时间的分布情况。 感兴趣的读者可以自行尝试。</p>`,68);function v(_,b){const a=i("ExternalLinkIcon");return t(),d("div",null,[c,s("p",null,[e("可以通过"),s("a",m,[e("http://localhost:9104"),r(a)]),e("访问MySQLD Exporter暴露的服务：")]),p])}const x=l(u,[["render",v],["__file","use-promethues-monitor-mysql.html.vue"]]);export{x as default};
