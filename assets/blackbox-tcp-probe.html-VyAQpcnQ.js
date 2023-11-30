import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as i,d as s}from"./app-tU1o2vQf.js";const t={},l=s(`<h1 id="tcp探针" tabindex="-1"><a class="header-anchor" href="#tcp探针" aria-hidden="true">#</a> TCP探针</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># The preferred IP protocol of the TCP probe (ip4, ip6).
[ preferred_ip_protocol: &lt;string&gt; | default = &quot;ip6&quot; ]

# The source IP address.
[ source_ip_address: &lt;string&gt; ]

# The query sent in the TCP probe and the expected associated response.
# starttls upgrades TCP connection to TLS.
query_response:
  [ - [ [ expect: &lt;string&gt; ],
        [ send: &lt;string&gt; ],
        [ starttls: &lt;boolean | default = false&gt; ]
      ], ...
  ]

# Whether or not TLS is used when the connection is initiated.
[ tls: &lt;boolean | default = false&gt; ]

# Configuration for TLS protocol of TCP probe.
tls_config:
  [ &lt;tls_config&gt; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),d=[l];function r(a,c){return n(),i("div",null,d)}const u=e(t,[["render",r],["__file","blackbox-tcp-probe.html.vue"]]);export{u as default};
