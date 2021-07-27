/**
 * Bozon depedencies injector plugin
 *
 * Injects a dependency list that exists in source package.json to the empty package.json bozon creates in its build/${env} folders
 * useful for embedding native modules that are not packed by webpack
 *
 * @author François Boukhalfa
 */


class BozonPackageDependencyInjectorPlugin {

    constructor(options) {
        this.source = 'src' in options ? options.src : null;
        this.destination = 'dest' in options ? options.dest : null;
        this.dependencies = 'dependencies' in options ? options.dependencies : [];
    }

    apply(compiler) {
        if (!this.dependencies.length) return;

        compiler.hooks.done.tapPromise('BozonPackageInjecterPlugin', (compilation) => {
            return new Promise((resolve, reject) => {
                const fs = require('fs');
                const path = require('path')
                const srcPath = path.resolve(this.source, 'package.json');
                const destPath = path.resolve(this.destination, 'package.json');
                if (!fs.existsSync(srcPath) ) {
                    resolve();
                    return;
                }
                try {
                    const packageSrc = JSON.parse( fs.readFileSync(srcPath, 'utf8'));
                    const packageDest = JSON.parse(fs.readFileSync(destPath, 'utf8'));
                    if( !packageDest.dependencies ) packageDest.dependencies = {};
                    this.dependencies.forEach( (dep) => {
                        if (dep in packageSrc.dependencies) {
                            packageDest.dependencies[dep] = packageSrc.dependencies[dep];
                        } else {
                            console.error("package", dep, "not found ", Object.keys(packageSrc.depedencies));
                        }
                    });

                    fs.writeFileSync(destPath, JSON.stringify(packageDest, null, 4), 'utf8');

                    resolve();
                } catch( e ) {
                    reject(e);
                }

            });
        })


    }
}


module.exports = BozonPackageDependencyInjectorPlugin;
