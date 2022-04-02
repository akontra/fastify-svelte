export default ({ css, script, content, props, extraData }) => `<!DOCTYPE html>
<html lang='en'>

<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<link rel='stylesheet' href='${css}'>
</head>

<body>
	<div id='content'>
		${content}
	</div>
	<script src='${script}'></script>
	<script>
		new Page({
			hydrate: true,
			props: ${props},
			target: document.getElementById('content'),
		});
	</script>
</body>

</html>`;