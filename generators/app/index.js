/**
 * Created by Necfol on 2/12/18.
 */
const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const Generator = require('yeoman-generator')
const Chalk = require('chalk')
const bar	= require('progress-bar').create(process.stdout)
const objectAssign = require('object-assign')
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.argument('appname', {
      type: String,
      require: true
    })
  }
  initializing() {
    this.log(Chalk.bold.green('开始构建npm结构'))
    this.log(' ')
  }
  prompting() {
    let versions = ['1.0.0', '0.0.1']
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.options.appname
    },{
      type    : 'input',
      name    : 'description',
      message : 'Your project description',
      default : 'some description'
    },{
      type    : 'list',
      name    : "version",
      message : "Choose Your Version",
      choices : versions,
      default : versions[0]
    },{
      type    : 'confirm',
      name    : "install",
      message : "Need npm install?",
      default : true
    }]).then((props) => {
      this.userOptions = props
  })
  }
  writing() {
    const {
      name,
      description,
      version
    } = this.userOptions
    let defaultSettings = this.fs.readJSON(this.templatePath('package.json'))
    let packageSettings = objectAssign({}, defaultSettings, {
      name,
      version,
      description
    })
    this.fs.writeJSON(this.destinationPath(`${name}/package.json`), packageSettings)
    this.fs.copy(
      this.templatePath(`src`),
      this.destinationPath(`${name}/src`)
    )
    this.fs.copy(
      this.templatePath(`.babelrc`),
      this.destinationPath(`${name}/.babelrc`)
    )
    this.fs.copy(
      this.templatePath(`.gitignore`),
      this.destinationPath(`${name}/.gitignore`)
    )
    this.fs.copy(
      this.templatePath(`.npmignore`),
      this.destinationPath(`${name}/.npmignore`)
    )
    this.fs.copy(
      this.templatePath(`webpack.config.js`),
      this.destinationPath(`${name}/webpack.config.js`)
    )
  }
  install () {
    const {
      name,
    } = this.userOptions
    exec('npm install', {cwd: `${this.destinationRoot()}/${name}/`})
    bar.update(0.5)
  }
}