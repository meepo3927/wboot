<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <%@include file="/views/include/head.jsp"%>
    <title>${fileName}</title>
</head>
<body>
    <div id="main" is="v-main"></div>
</body>
</html>
<%@include file="/views/include/scripts.jsp"%>
<script src="${ctx}/static/dist/${fileName}.js?v=${staticVersion}"></script>
