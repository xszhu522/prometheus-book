import {sidebar} from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "Introduction.md",
    {
      text: "Part I - Prometheus基础",
      children: [
        {
          text: "第1章 天降奇兵",
          prefix: "quickstart/",
          link: "quickstart/",
          collapsible: true,
          children: [
            "why-monitor.md",
            {
              text: "初识Prometheus",
              collapsible: true,
              children: [
                "prometheus-quick-start.md",
                "install-prometheus-server.md",
                "use-node-exporter.md",
                "promql_quickstart.md",
                "use-grafana-create-dashboard.md",
              ],
            },
            "prometheus-job-and-instance.md",
            "prometheus-arch.md",
            "SUMMARY.md",
          ],
        },
        {
          text: "第2章 探索PromQL",
          prefix: "promql/",
          link: "promql/",
          collapsible: true,
          children: [
            "what-is-prometheus-metrics-and-labels.md",
            "prometheus-metrics-types.md",
            "prometheus-query-language.md",
            "prometheus-promql-operators-v2.md",
            "prometheus-aggr-ops.md",
            "prometheus-promql-functions.md",
            "prometheus-promql-with-http-api.md",
            "prometheus-promql-best-praticase.md",
            "SUMMARY.md",
          ],
        },
        {
          text: "第3章 Prometheus告警处理",
          prefix: "alert/",
          link: "alert/",
          collapsible: true,
          children: [
            "prometheus-alert-manager-overview.md",
            "prometheus-alert-rule.md",
            "install-alert-manager.md",
            "alert-manager-config.md",
            "alert-manager-route.md",
            {
              text: "使用Receiver接收告警信息",
              collapsible: true,
              children: [
                "alert-manager-use-receiver.md",
                "alert-with-smtp.md",
                "alert-with-slack.md",
                "alert-with-wechat.md",
                "alert-manager-extension-with-webhook.md",
              ],
            },
            "alert-template.md",
            "alert-manager-inhibit.md",
            "prometheus-recoding-rules.md",
            "SUMMARY.md",
          ],
        },
      ],
    },
    {
      text: "Part II - Prometheus进阶",
      children: [
        {
          text: "第4章 Exporter详解",
          prefix: "exporter/",
          link: "exporter/",
          collapsible: true,
          children: [
            "what-is-prometheus-exporter.md",
            {
              text: "常用Exporter",
              collapsible: true,
              children: [
                "commonly-eporter-usage.md",
                "use-prometheus-monitor-container.md",
                "use-promethues-monitor-mysql.md",
                "install_blackbox_exporter.md",
              ],
            },
            {
              text: "使用Java自定义Exporter",
              collapsible: true,
              children: [
                "custom_exporter_with_java.md",
                "client_library_java.md",
                "custom_app_support_prometheus.md",
              ],
            },
            "SUMMARY.md",
          ],
        },
        {
          text: "第5章 数据与可视化",
          prefix: "grafana/",
          link: "grafana/",
          collapsible: true,
          children: [
            "use-console-template.md",
            "grafana-intro.md",
            {
              text: "Grafana与数据可视化",
              collapsible: true,
              children: [
                "grafana-panels.md",
                "use_graph_panel.md",
                "use_heatmap_panel.md",
                "use_singlestat_panel.md",
              ],
            },
            "templating.md",
            "SUMMARY.md",
          ],
        },
        {
          text: "第6章 集群与高可用",
          prefix: "ha/",
          link: "ha/READMD.md",
          collapsible: true,
          children: [
            "prometheus-local-storage.md",
            "prometheus-remote-storage.md",
            "scale-prometheus-with-federation.md",
            "prometheus-and-high-availability.md",
            "alertmanager-high-availability.md",
            "SUMMARY.md",
          ],
        },
        {
          text: "第7章 Prometheus服务发现",
          prefix: "sd/",
          link: "sd/",
          collapsible: true,
          children: [
            "why-need-service-discovery.md",
            "service-discovery-with-file.md",
            "service-discovery-with-consul.md",
            "service-discovery-with-relabel.md",
            "SUMMARY.md",
          ],
        },
      ],
    },
    {
      text: "Part III - Prometheus实战",
      children: [
        {
          text: "第8章 监控Kubernetes",
          prefix: "kubernetes/",
          link: "kubernetes/READMD.md",
          collapsible: true,
          children: [
            "kubernetes-with-minikube.md",
            "deploy-prometheus-in-kubernetes.md",
            "service-discovery-with-kubernetes.md",
            "use-prometheus-monitor-kubernetes.md",
            "hap-with-prometheus.md",
            "SUMMARY.md",
          ],
        },
        {
          text: "第9章 Prometheus Operator",
          prefix: "operator/",
          link: "operator/",
          collapsible: true,
          children: [
            "what-is-prometheus-operator.md",
            "use-operator-manage-prometheus.md",
            "use-operator-manage-monitor.md",
            "use-custom-configuration-in-operator.md",
            "SUMMARY.md",
          ],
        },
      ],
    },
    "REFERENCES.md",
  ],
});
