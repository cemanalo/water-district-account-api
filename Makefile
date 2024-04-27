_packDepsLayer:
	rm -rf nodejs
	rm -f water-billing-deps.zip
	mkdir nodejs
	cp package.json package-lock.json nodejs
	cd nodejs && npm install --omit=dev
	zip -vr water-district-deps.zip nodejs/

_publishDepsLayer:
	aws lambda publish-layer-version --layer-name water-district-deps \
    --description "water billing deps Layer" \
    --zip-file fileb://water-district-deps.zip \
    --compatible-runtimes nodejs \
    --compatible-architectures "arm64"

_build:
	npm run build

_deploy:
	npm run deploy

_start:
	npm run start

_deps:
	npm run install