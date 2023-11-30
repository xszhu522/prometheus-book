import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as n,d as s}from"./app-tU1o2vQf.js";const l={},d=s(`<h1 id="dns探针" tabindex="-1"><a class="header-anchor" href="#dns探针" aria-hidden="true">#</a> DNS探针</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># The preferred IP protocol of the DNS probe (ip4, ip6).
[ preferred_ip_protocol: &lt;string&gt; | default = &quot;ip6&quot; ]

# The source IP address.
[ source_ip_address: &lt;string&gt; ]

[ transport_protocol: &lt;string&gt; | default = &quot;udp&quot; ] # udp, tcp

query_name: &lt;string&gt;

[ query_type: &lt;string&gt; | default = &quot;ANY&quot; ]

# List of valid response codes.
valid_rcodes:
  [ - &lt;string&gt; ... | default = &quot;NOERROR&quot; ]

validate_answer_rrs:

  fail_if_matches_regexp:
    [ - &lt;regex&gt;, ... ]

  fail_if_not_matches_regexp:
    [ - &lt;regex&gt;, ... ]

validate_authority_rrs:

  fail_if_matches_regexp:
    [ - &lt;regex&gt;, ... ]

  fail_if_not_matches_regexp:
    [ - &lt;regex&gt;, ... ]

validate_additional_rrs:

  fail_if_matches_regexp:
    [ - &lt;regex&gt;, ... ]

  fail_if_not_matches_regexp:
    [ - &lt;regex&gt;, ... ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),r=[d];function a(t,v){return i(),n("div",null,r)}const m=e(l,[["render",a],["__file","blackbox-dns-probe.html.vue"]]);export{m as default};
