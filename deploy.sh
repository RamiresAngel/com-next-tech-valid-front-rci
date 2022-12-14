echo 'proseso deploy en angular'
echo 'elimino archivos actuales'
rm -r public/*
rm -r dist/*
echo 'costruyo proyecto angular'
npm run build-prod
echo 'copio los nuevor archivos'
cp -r ./dist/recepcion-cr/* public/
echo 'creo el switch al proyecto'
firebase use com-next-valid
echo 'inicia el deploy'
firebase deploy --only hosting:com-next-valid-rci
echo 'elimino archivos Ceados en proyecto angular'
rm -r public/*
rm -r dist/*
echo 'fin de proceso'
