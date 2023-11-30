import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as n,d as s}from"./app-NWC4HiYT.js";const t={},d=s(`<h2 id="http探针" tabindex="-1"><a class="header-anchor" href="#http探针" aria-hidden="true">#</a> HTTP探针</h2><p>HTTP探针是进行黑盒监控时最常用的探针之一，通过HTTP探针能够网站或者HTTP服务建立有效的监控，包括其本身的可用性，以及用户体验相关的如响应时间等等。除了能够在服务出现异常的时候及时报警，还能帮助系统管理员分析和优化网站体验。</p><p>在上一小节讲过，Blockbox Exporter中所有的探针均是以Module的信息进行配置。如下所示，配置了一个最简单的HTTP探针：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>modules:
  http_2xx_example:
    prober: http
    http:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过prober配置项指定探针类型。配置项http用于自定义探针的探测方式，这里有没对http配置项添加任何配置，表示完全使用HTTP探针的默认配置，该探针将使用HTTP GET的方式对目标服务进行探测，并且验证返回状态码是否为2XX，是则表示验证成功，否则失败。</p><h3 id="自定义http请求" tabindex="-1"><a class="header-anchor" href="#自定义http请求" aria-hidden="true">#</a> 自定义HTTP请求</h3><p>HTTP服务通常会以不同的形式对外展现，有些可能就是一些简单的网页，而有些则可能是一些基于REST的API服务。 对于不同类型的HTTP的探测需要管理员能够对HTTP探针的行为进行更多的自定义设置，包括：HTTP请求方法、HTTP头信息、请求参数等。对于某些启用了安全认证的服务还需要能够对HTTP探测设置相应的Auth支持。对于HTTPS类型的服务还需要能够对证书进行自定义设置。</p><p>如下所示，这里通过method定义了探测时使用的请求方法，对于一些需要请求参数的服务，还可以通过headers定义相关的请求头信息，使用body定义请求内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_post_2xx:
    prober: http
    timeout: 5s
    http:
      method: POST
      headers:
        Content-Type: application/json
      body: &#39;{}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果HTTP服务启用了安全认证，Blockbox Exporter内置了对basic_auth的支持，可以直接设置相关的认证信息即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http_basic_auth_example:
    prober: http
    timeout: 5s
    http:
      method: POST
      headers:
        Host: &quot;login.example.com&quot;
      basic_auth:
        username: &quot;username&quot;
        password: &quot;mysecret&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于使用了Bear Token的服务也可以通过bearer_token配置项直接指定令牌字符串，或者通过bearer_token_file指定令牌文件。</p><p>对于一些启用了HTTPS的服务，但是需要自定义证书的服务，可以通过tls_config指定相关的证书信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> http_custom_ca_example:
    prober: http
    http:
      method: GET
      tls_config:
        ca_file: &quot;/certs/my_cert.crt&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义探针行为" tabindex="-1"><a class="header-anchor" href="#自定义探针行为" aria-hidden="true">#</a> 自定义探针行为</h3><p>在默认情况下HTTP探针只会对HTTP返回状态码进行校验，如果状态码为2XX（200 &lt;= StatusCode &lt; 300）则表示探测成功，并且探针返回的指标probe_success值为1。</p><p>如果用户需要指定HTTP返回状态码，或者对HTTP版本有特殊要求，如下所示，可以使用valid_http_versions和valid_status_codes进行定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  http_2xx_example:
    prober: http
    timeout: 5s
    http:
      valid_http_versions: [&quot;HTTP/1.1&quot;, &quot;HTTP/2&quot;]
      valid_status_codes: []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，Blockbox返回的样本数据中也会包含指标probe_http_ssl，用于表明当前探针是否使用了SSL：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP probe_http_ssl Indicates if SSL was used for the final redirect
# TYPE probe_http_ssl gauge
probe_http_ssl 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而如果用户对于HTTP服务是否启用SSL有强制的标准。则可以使用fail_if_ssl和fail_if_not_ssl进行配置。fail_if_ssl为true时，表示如果站点启用了SSL则探针失败，反之成功。fail_if_not_ssl刚好相反。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  http_2xx_example:
    prober: http
    timeout: 5s
    http:
      valid_status_codes: []
      method: GET
      no_follow_redirects: false
      fail_if_ssl: false
      fail_if_not_ssl: false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了基于HTTP状态码，HTTP协议版本以及是否启用SSL作为控制探针探测行为成功与否的标准以外，还可以匹配HTTP服务的响应内容。使用fail_if_matches_regexp和fail_if_not_matches_regexp用户可以定义一组正则表达式，用于验证HTTP返回内容是否符合或者不符合正则表达式的内容。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  http_2xx_example:
    prober: http
    timeout: 5s
    http:
      method: GET
      fail_if_matches_regexp:
        - &quot;Could not connect to database&quot;
      fail_if_not_matches_regexp:
        - &quot;Download the latest version here&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后需要提醒的时，默认情况下HTTP探针会走IPV6的协议。 在大多数情况下，可以使用preferred_ip_protocol=ip4强制通过IPV4的方式进行探测。在Bloackbox响应的监控样本中，也会通过指标probe_ip_protocol，表明当前的协议使用情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP probe_ip_protocol Specifies whether probe ip protocol is IP4 or IP6
# TYPE probe_ip_protocol gauge
probe_ip_protocol 6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),a=[d];function l(r,c){return i(),n("div",null,a)}const u=e(t,[["render",l],["__file","blackbox-http-probe.html.vue"]]);export{u as default};
