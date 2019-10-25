(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/toConsumableArray'), require('@babel/runtime/helpers/typeof'), require('@babel/runtime/helpers/slicedToArray'), require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('three'), require('three/examples/jsm/loaders/STLLoader.js'), require('three/examples/jsm/loaders/ColladaLoader.js'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('@babel/runtime/helpers/get'), require('@babel/runtime/helpers/inherits'), require('three-mesh-bvh')) :
    typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/toConsumableArray', '@babel/runtime/helpers/typeof', '@babel/runtime/helpers/slicedToArray', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', 'three', 'three/examples/jsm/loaders/STLLoader.js', 'three/examples/jsm/loaders/ColladaLoader.js', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', '@babel/runtime/helpers/get', '@babel/runtime/helpers/inherits', 'three-mesh-bvh'], factory) :
    (global = global || self, global.URDFLoader = factory(global._toConsumableArray, global._typeof, global._slicedToArray, global._classCallCheck, global._createClass, global.THREE, global.THREE, global.THREE, global._possibleConstructorReturn, global._getPrototypeOf, global._get, global._inherits, global.THREE));
}(this, function (_toConsumableArray, _typeof, _slicedToArray, _classCallCheck, _createClass, THREE, STLLoader_js, ColladaLoader_js, _possibleConstructorReturn, _getPrototypeOf, _get, _inherits, threeMeshBvh) { 'use strict';

    _toConsumableArray = _toConsumableArray && _toConsumableArray.hasOwnProperty('default') ? _toConsumableArray['default'] : _toConsumableArray;
    _typeof = _typeof && _typeof.hasOwnProperty('default') ? _typeof['default'] : _typeof;
    _slicedToArray = _slicedToArray && _slicedToArray.hasOwnProperty('default') ? _slicedToArray['default'] : _slicedToArray;
    _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
    _createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
    _possibleConstructorReturn = _possibleConstructorReturn && _possibleConstructorReturn.hasOwnProperty('default') ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
    _getPrototypeOf = _getPrototypeOf && _getPrototypeOf.hasOwnProperty('default') ? _getPrototypeOf['default'] : _getPrototypeOf;
    _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;
    _inherits = _inherits && _inherits.hasOwnProperty('default') ? _inherits['default'] : _inherits;

    function URDFColliderClone() {
      var _proto$clone;

      var proto = Object.getPrototypeOf(this);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = (_proto$clone = proto.clone).call.apply(_proto$clone, [this].concat(args));

      result.isURDFCollider = true;
      return result;
    }

    ;

    function makeURDFCollider(object) {
      object.isURDFCollider = true;
      object.clone = URDFColliderClone;
    }

    var URDFLink =
    /*#__PURE__*/
    function (_Object3D) {
      _inherits(URDFLink, _Object3D);

      function URDFLink() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, URDFLink);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(URDFLink)).call.apply(_getPrototypeOf2, [this].concat(args)));
        _this.isURDFLink = true;
        _this.type = 'URDFLink';
        _this.urdfNode = null;
        return _this;
      }

      _createClass(URDFLink, [{
        key: "copy",
        value: function copy(source, recursive) {
          _get(_getPrototypeOf(URDFLink.prototype), "copy", this).call(this, source, recursive);

          this.urdfNode = source.urdfNode;
          return this;
        }
      }]);

      return URDFLink;
    }(THREE.Object3D);

    var URDFJoint =
    /*#__PURE__*/
    function (_Object3D2) {
      _inherits(URDFJoint, _Object3D2);

      _createClass(URDFJoint, [{
        key: "jointType",
        get: function get() {
          return this._jointType;
        },
        set: function set(v) {
          if (this.jointType === v) return;
          this._jointType = v;

          switch (v) {
            case 'fixed':
            case 'continuous':
            case 'revolute':
            case 'prismatic':
              this.jointValue = 0;
              break;

            case 'planar':
              this.jointValue = new Array(2).fill(0);
              break;

            case 'floating':
              this.jointValue = new Array(6).fill(0);
              break;
          }
        }
      }, {
        key: "angle",
        get: function get() {
          return this.jointValue;
        }
      }]);

      function URDFJoint() {
        var _getPrototypeOf3;

        var _this2;

        _classCallCheck(this, URDFJoint);

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(URDFJoint)).call.apply(_getPrototypeOf3, [this].concat(args)));
        _this2.isURDFJoint = true;
        _this2.type = 'URDFJoint';
        _this2.urdfNode = null;
        _this2.jointValue = null;
        _this2.jointType = 'fixed';
        _this2.axis = null;
        _this2.limit = {
          lower: 0,
          upper: 0
        };
        _this2.ignoreLimits = false;
        _this2.origPosition = null;
        _this2.origQuaternion = null;
        return _this2;
      }
      /* Overrides */


      _createClass(URDFJoint, [{
        key: "copy",
        value: function copy(source, recursive) {
          _get(_getPrototypeOf(URDFJoint.prototype), "copy", this).call(this, source, recursive);

          this.urdfNode = source.urdfNode;
          this.jointType = source.jointType;
          this.axis = source.axis ? source.axis.clone() : null;
          this.limit.lower = source.limit.lower;
          this.limit.upper = source.limit.upper;
          this.ignoreLimits = false;
          this.jointValue = Array.isArray(source.jointValue) ? _toConsumableArray(source.jointValue) : source.jointValue;
          this.origPosition = source.origPosition ? source.origPosition.clone() : null;
          this.origQuaternion = source.origQuaternion ? source.origQuaternion.clone() : null;
          return this;
        }
        /* Public Functions */

      }, {
        key: "setAngle",
        value: function setAngle() {
          return this.setOffset.apply(this, arguments);
        }
      }, {
        key: "setOffset",
        value: function setOffset() {
          for (var _len4 = arguments.length, values = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            values[_key4] = arguments[_key4];
          }

          values = values.map(function (v) {
            return parseFloat(v);
          });

          if (!this.origPosition || !this.origQuaternion) {
            this.origPosition = this.position.clone();
            this.origQuaternion = this.quaternion.clone();
          }

          switch (this.jointType) {
            case 'fixed':
              {
                break;
              }

            case 'continuous':
            case 'revolute':
              {
                var angle = values[0];
                if (angle == null) break;
                if (angle === this.jointValue) break;

                if (!this.ignoreLimits && this.jointType === 'revolute') {
                  angle = Math.min(this.limit.upper, angle);
                  angle = Math.max(this.limit.lower, angle);
                } // FromAxisAngle seems to rotate the opposite of the
                // expected angle for URDF, so negate it here


                var delta = new THREE.Quaternion().setFromAxisAngle(this.axis, angle);
                this.quaternion.multiplyQuaternions(this.origQuaternion, delta);
                this.jointValue = angle;
                this.matrixWorldNeedsUpdate = true;
                break;
              }

            case 'prismatic':
              {
                var _angle = values[0];
                if (_angle == null) break;
                if (_angle === this.jointValue) break;

                if (!this.ignoreLimits) {
                  _angle = Math.min(this.limit.upper, _angle);
                  _angle = Math.max(this.limit.lower, _angle);
                }

                this.position.copy(this.origPosition);
                this.position.addScaledVector(this.axis, _angle);
                this.jointValue = _angle;
                this.worldMatrixNeedsUpdate = true;
                break;
              }

            case 'floating':
            case 'planar':
              // TODO: Support these joint types
              console.warn("'".concat(this.jointType, "' joint not yet supported"));
          }

          return this.jointValue;
        }
      }]);

      return URDFJoint;
    }(THREE.Object3D);

    var URDFRobot =
    /*#__PURE__*/
    function (_URDFLink) {
      _inherits(URDFRobot, _URDFLink);

      function URDFRobot() {
        var _getPrototypeOf4;

        var _this3;

        _classCallCheck(this, URDFRobot);

        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        _this3 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(URDFRobot)).call.apply(_getPrototypeOf4, [this].concat(args)));
        _this3.isURDFRobot = true;
        _this3.urdfNode = null;
        _this3.urdfRobotNode = null;
        _this3.robotName = null;
        _this3.links = null;
        _this3.joints = null;
        return _this3;
      }

      _createClass(URDFRobot, [{
        key: "copy",
        value: function copy(source, recursive) {
          var _this4 = this;

          _get(_getPrototypeOf(URDFRobot.prototype), "copy", this).call(this, source, recursive);

          this.urdfRobotNode = source.urdfRobotNode;
          this.robotName = source.robotName;
          this.links = {};
          this.joints = {};
          this.traverse(function (c) {
            if (c.isURDFJoint && c.name in source.joints) {
              _this4.joints[c.name] = c;
            }

            if (c.isURDFLink && c.name in source.links) {
              _this4.links[c.name] = c;
            }
          });
          return this;
        }
      }, {
        key: "setAngle",
        value: function setAngle(jointName) {
          var joint = this.joints[jointName];

          if (joint) {
            for (var _len6 = arguments.length, angle = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
              angle[_key6 - 1] = arguments[_key6];
            }

            return joint.setAngle.apply(joint, angle);
          }

          return null;
        }
      }, {
        key: "setAngles",
        value: function setAngles(angles) {
          // TODO: How to handle other, multi-dimensional joint types?
          for (var name in angles) {
            this.setAngle(name, angles[name]);
          }
        }
      }]);

      return URDFRobot;
    }(URDFLink);

    /*
    Reference coordinate frames for THREE.js and ROS.
    Both coordinate systems are right handed so the URDF is instantiated without
    frame transforms. The resulting model can be rotated to rectify the proper up,
    right, and forward directions

    THREE.js
       Y
       |
       |
       .-----X
     ／
    Z

    ROS URDf
           Z
           |   X
           | ／
     Y-----.

    */

    var tempQuaternion = new THREE.Quaternion();
    var tempEuler = new THREE.Euler(); // take a vector "x y z" and process it into
    // an array [x, y, z]

    function processTuple(val) {
      if (!val) return [0, 0, 0];
      return val.trim().split(/\s+/g).map(function (num) {
        return parseFloat(num);
      });
    } // applies a rotation a threejs object in URDF order


    function applyRotation(obj, rpy) {
      var additive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // if additive is true the rotation is applied in
      // addition to the existing rotation
      if (!additive) obj.rotation.set(0, 0, 0);
      tempEuler.set(rpy[0], rpy[1], rpy[2], 'ZYX');
      tempQuaternion.setFromEuler(tempEuler);
      tempQuaternion.multiply(obj.quaternion);
      obj.quaternion.copy(tempQuaternion);
    }
    /* URDFLoader Class */
    // Loads and reads a URDF file into a THREEjs Object3D format


    var URDFLoader =
    /*#__PURE__*/
    function () {
      function URDFLoader(manager) {
        _classCallCheck(this, URDFLoader);

        this.manager = manager || THREE.DefaultLoadingManager;
      }
      /* Public API */
      // urdf:    The path to the URDF within the package OR absolute
      // onComplete:      Callback that is passed the model once loaded


      _createClass(URDFLoader, [{
        key: "load",
        value: function load(urdf, onComplete, onProgress, onError, options) {
          var _this = this;

          // Check if a full URI is specified before
          // prepending the package info
          var manager = this.manager;
          var workingPath = THREE.LoaderUtils.extractUrlBase(urdf);
          var urdfPath = this.manager.resolveURL(urdf);
          var errors = {};

          var managerOnErrorDefault = function managerOnErrorDefault() {};

          var managerOnProgressDefault = function managerOnProgressDefault() {};

          var managerOnLoadDefault = function managerOnLoadDefault() {};

          var model;

          if (manager.onError) {
            managerOnErrorDefault = manager.onProgress.bind(manager);
          }

          if (manager.onProgress) {
            managerOnProgressDefault = manager.onProgress.bind(manager);
          }

          if (manager.onLoad) {
            managerOnLoadDefault = manager.onLoad.bind(manager);
          }

          manager.onError = function (url) {
            errors[url] = 'Error in loading resource';

            if (onError) {
              onError(url);
            }

            managerOnErrorDefault(url);
          };

          manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            if (onProgress) {
              onProgress(url, itemsLoaded, itemsTotal);
            }

            managerOnProgressDefault(url, itemsLoaded, itemsTotal);
          };

          manager.onLoad = function () {
            if (onComplete) {
              var partialErrors = Object.keys(errors).length === 0 ? undefined : errors;
              onComplete(model, partialErrors);
            }

            managerOnLoadDefault();
          };

          options = Object.assign({
            workingPath: workingPath
          }, options);
          manager.itemStart(urdfPath);
          fetch(urdfPath, options.fetchOptions).then(function (res) {
            return res.text();
          }).then(function (data) {
            model = _this.parse(data, options);
            manager.itemEnd(urdfPath);
          })["catch"](function (e) {
            console.error('URDFLoader: Error parsing file.', e);
            manager.itemError(urdfPath);
            manager.itemEnd(urdfPath);
          });
        }
      }, {
        key: "parse",
        value: function parse(content) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var packages = options.packages || '';
          var loadMeshCb = options.loadMeshCb || this.defaultMeshLoader.bind(this);
          var workingPath = options.workingPath || '';
          var parseVisual = 'parseVisual' in options ? options.parseVisual : true;
          var parseCollision = options.parseCollision || false;
          var manager = this.manager;
          var linkMap = {};
          var jointMap = {};
          var materialMap = {}; // Resolves the path of mesh files

          function resolvePath(path) {
            if (!/^package:\/\//.test(path)) {
              return workingPath ? workingPath + path : path;
            } // Remove "package://" keyword and split meshPath at the first slash


            var _path$replace$split = path.replace(/^package:\/\//, '').split(/\/(.+)/),
                _path$replace$split2 = _slicedToArray(_path$replace$split, 2),
                targetPkg = _path$replace$split2[0],
                relPath = _path$replace$split2[1];

            if (typeof packages === 'string') {
              // "pkg" is one single package
              if (packages.endsWith(targetPkg)) {
                // "pkg" is the target package
                return packages + '/' + relPath;
              } else {
                // Assume "pkg" is the target package's parent directory
                return packages + '/' + targetPkg + '/' + relPath;
              }
            } else if (_typeof(packages) === 'object') {
              // "pkg" is a map of packages
              if (targetPkg in packages) {
                return packages[targetPkg] + '/' + relPath;
              } else {
                console.error("URDFLoader : ".concat(targetPkg, " not found in provided package list."));
                return null;
              }
            }
          } // Process the URDF text format


          function processUrdf(data) {
            var parser = new DOMParser();
            var urdf = parser.parseFromString(data, 'text/xml');

            var children = _toConsumableArray(urdf.children);

            var robotNode = children.filter(function (c) {
              return c.nodeName === 'robot';
            }).pop();
            return processRobot(robotNode);
          } // Process the <robot> node


          function processRobot(robot) {
            var robotNodes = _toConsumableArray(robot.children);

            var links = robotNodes.filter(function (c) {
              return c.nodeName.toLowerCase() === 'link';
            });
            var joints = robotNodes.filter(function (c) {
              return c.nodeName.toLowerCase() === 'joint';
            });
            var materials = robotNodes.filter(function (c) {
              return c.nodeName.toLowerCase() === 'material';
            });
            var obj = new URDFRobot();
            obj.robotName = robot.getAttribute('name');
            obj.urdfRobotNode = robot; // Create the <material> map

            materials.forEach(function (m) {
              var name = m.getAttribute('name');
              materialMap[name] = processMaterial(m);
            }); // Create the <link> map

            links.forEach(function (l) {
              var name = l.getAttribute('name');
              var isRoot = robot.querySelector("child[link=\"".concat(name, "\"]")) === null;
              linkMap[name] = processLink(l, isRoot ? obj : null);
            }); // Create the <joint> map

            joints.forEach(function (j) {
              var name = j.getAttribute('name');
              jointMap[name] = processJoint(j);
            });
            obj.joints = jointMap;
            obj.links = linkMap;
            return obj;
          } // Process joint nodes and parent them


          function processJoint(joint) {
            var children = _toConsumableArray(joint.children);

            var jointType = joint.getAttribute('type');
            var obj = new URDFJoint();
            obj.urdfNode = joint;
            obj.name = joint.getAttribute('name');
            obj.jointType = jointType;
            var parent = null;
            var child = null;
            var xyz = [0, 0, 0];
            var rpy = [0, 0, 0]; // Extract the attributes

            children.forEach(function (n) {
              var type = n.nodeName.toLowerCase();

              if (type === 'origin') {
                xyz = processTuple(n.getAttribute('xyz'));
                rpy = processTuple(n.getAttribute('rpy'));
              } else if (type === 'child') {
                child = linkMap[n.getAttribute('link')];
              } else if (type === 'parent') {
                parent = linkMap[n.getAttribute('link')];
              } else if (type === 'limit') {
                obj.limit.lower = parseFloat(n.getAttribute('lower') || obj.limit.lower);
                obj.limit.upper = parseFloat(n.getAttribute('upper') || obj.limit.upper);
              }
            }); // Join the links

            parent.add(obj);
            obj.add(child);
            applyRotation(obj, rpy);
            obj.position.set(xyz[0], xyz[1], xyz[2]); // Set up the rotate function

            var axisNode = children.filter(function (n) {
              return n.nodeName.toLowerCase() === 'axis';
            })[0];

            if (axisNode) {
              var axisXYZ = axisNode.getAttribute('xyz').split(/\s+/g).map(function (num) {
                return parseFloat(num);
              });
              obj.axis = new THREE.Vector3(axisXYZ[0], axisXYZ[1], axisXYZ[2]);
              obj.axis.normalize();
            }

            return obj;
          } // Process the <link> nodes


          function processLink(link) {
            var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (target === null) {
              target = new URDFLink();
            }

            var children = _toConsumableArray(link.children);

            target.name = link.getAttribute('name');
            target.urdfNode = link;

            if (parseVisual) {
              var visualNodes = children.filter(function (n) {
                return n.nodeName.toLowerCase() === 'visual';
              });
              visualNodes.forEach(function (vn) {
                return processLinkElement(vn, target, materialMap);
              });
            }

            if (parseCollision) {
              var collisionNodes = children.filter(function (n) {
                return n.nodeName.toLowerCase() === 'collision';
              });
              collisionNodes.forEach(function (vn) {
                return processLinkElement(vn, target);
              });
            }

            return target;
          }

          function processMaterial(node) {
            var matNodes = _toConsumableArray(node.children);

            var material = new THREE.MeshPhongMaterial();
            material.name = node.getAttribute('name') || '';
            matNodes.forEach(function (n) {
              var type = n.nodeName.toLowerCase();

              if (type === 'color') {
                var rgba = n.getAttribute('rgba').split(/\s/g).map(function (v) {
                  return parseFloat(v);
                });
                material.color.setRGB(rgba[0], rgba[1], rgba[2]);
                material.opacity = rgba[3];
                material.transparent = rgba[3] < 1;
              } else if (type === 'texture') {
                var loader = new THREE.TextureLoader(manager);
                var filename = n.getAttribute('filename');
                var filePath = resolvePath(filename);
                material.map = loader.load(filePath);
              }
            });
            return material;
          } // Process the visual and collision nodes into meshes


          function processLinkElement(vn, linkObj) {
            var materialMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var isCollisionNode = vn.nodeName.toLowerCase() === 'collision';
            var xyz = [0, 0, 0];
            var rpy = [0, 0, 0];
            var scale = [1, 1, 1];

            var children = _toConsumableArray(vn.children);

            var material = null;
            var primitiveModel = null; // get the material first

            var materialNode = children.filter(function (n) {
              return n.nodeName.toLowerCase() === 'material';
            })[0];

            if (materialNode) {
              var name = materialNode.getAttribute('name');

              if (name && name in materialMap) {
                material = materialMap[name];
              } else {
                material = processMaterial(materialNode);
              }
            } else {
              material = new THREE.MeshPhongMaterial();
            }

            children.forEach(function (n) {
              var type = n.nodeName.toLowerCase();

              if (type === 'geometry') {
                var geoType = n.children[0].nodeName.toLowerCase();

                if (geoType === 'mesh') {
                  var filename = n.children[0].getAttribute('filename');
                  var filePath = resolvePath(filename); // file path is null if a package directory is not provided.

                  if (filePath !== null) {
                    var scaleAttr = n.children[0].getAttribute('scale');
                    if (scaleAttr) scale = processTuple(scaleAttr);
                    loadMeshCb(filePath, manager, function (obj, err) {
                      if (err) {
                        console.error('URDFLoader: Error loading mesh.', err);
                      } else if (obj) {
                        if (obj instanceof THREE.Mesh) {
                          obj.material = material;
                          obj.raycast = threeMeshBvh.acceleratedRaycast;
                          obj.geometry.boundsTree = new threeMeshBvh.MeshBVH(obj.geometry);
                        }

                        linkObj.add(obj);
                        obj.position.set(xyz[0], xyz[1], xyz[2]);
                        obj.rotation.set(0, 0, 0); // multiply the existing scale by the scale components because
                        // the loaded model could have important scale values already applied
                        // to the root. Collada files, for example, can load in with a scale
                        // to convert the model units to meters.

                        obj.scale.x *= scale[0];
                        obj.scale.y *= scale[1];
                        obj.scale.z *= scale[2];
                        applyRotation(obj, rpy);

                        if (isCollisionNode) {
                          makeURDFCollider(obj);
                        }
                      }
                    });
                  }
                } else if (geoType === 'box') {
                  primitiveModel = new THREE.Mesh();
                  primitiveModel.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
                  primitiveModel.material = material;
                  primitiveModel.raycast = threeMeshBvh.acceleratedRaycast;
                  primitiveModel.geometry.boundsTree = new threeMeshBvh.MeshBVH(primitiveModel.geometry);
                  var size = processTuple(n.children[0].getAttribute('size'));
                  linkObj.add(primitiveModel);
                  primitiveModel.scale.set(size[0], size[1], size[2]);

                  if (isCollisionNode) {
                    makeURDFCollider(primitiveModel);
                  }
                } else if (geoType === 'sphere') {
                  primitiveModel = new THREE.Mesh();
                  primitiveModel.geometry = new THREE.SphereBufferGeometry(1, 30, 30);
                  primitiveModel.material = material;
                  primitiveModel.raycast = threeMeshBvh.acceleratedRaycast;
                  primitiveModel.geometry.boundsTree = new threeMeshBvh.MeshBVH(primitiveModel.geometry);
                  var radius = parseFloat(n.children[0].getAttribute('radius')) || 0;
                  primitiveModel.scale.set(radius, radius, radius);
                  linkObj.add(primitiveModel);

                  if (isCollisionNode) {
                    makeURDFCollider(primitiveModel);
                  }
                } else if (geoType === 'cylinder') {
                  primitiveModel = new THREE.Mesh();
                  primitiveModel.geometry = new THREE.CylinderBufferGeometry(1, 1, 1, 30);
                  primitiveModel.material = material;
                  primitiveModel.raycast = threeMeshBvh.acceleratedRaycast;
                  primitiveModel.geometry.boundsTree = new threeMeshBvh.MeshBVH(primitiveModel.geometry);

                  var _radius = parseFloat(n.children[0].getAttribute('radius')) || 0;

                  var length = parseFloat(n.children[0].getAttribute('length')) || 0;
                  primitiveModel.scale.set(_radius, length, _radius);
                  primitiveModel.rotation.set(Math.PI / 2, 0, 0);
                  linkObj.add(primitiveModel);

                  if (isCollisionNode) {
                    makeURDFCollider(primitiveModel);
                  }
                }
              } else if (type === 'origin') {
                xyz = processTuple(n.getAttribute('xyz'));
                rpy = processTuple(n.getAttribute('rpy'));
              }
            }); // apply the position and rotation to the primitive geometry after
            // the fact because it's guaranteed to have been scraped from the child
            // nodes by this point

            if (primitiveModel) {
              applyRotation(primitiveModel, rpy, true);
              primitiveModel.position.set(xyz[0], xyz[1], xyz[2]);
            }
          }

          return processUrdf(content);
        } // Default mesh loading function

      }, {
        key: "defaultMeshLoader",
        value: function defaultMeshLoader(path, manager, done) {
          if (/\.stl$/i.test(path)) {
            var loader = new STLLoader_js.STLLoader(manager);
            loader.load(path, function (geom) {
              var mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial());
              done(mesh);
            });
          } else if (/\.dae$/i.test(path)) {
            var _loader = new ColladaLoader_js.ColladaLoader(manager);

            _loader.load(path, function (dae) {
              return done(dae.scene);
            });
          } else {
            console.warn("URDFLoader: Could not load model at ".concat(path, ".\nNo loader available"));
          }
        }
      }]);

      return URDFLoader;
    }();
    ;

    return URDFLoader;

}));
//# sourceMappingURL=URDFLoader.js.map
