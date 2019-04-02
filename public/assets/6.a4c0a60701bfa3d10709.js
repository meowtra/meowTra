(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./src/pages/project/index.js":
/*!************************************!*\
  !*** ./src/pages/project/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar FakeImage = {\n  name: 'fake-image',\n  render: function render() {\n    var h = arguments[0];\n    return h(\"svg\", {\n      attrs: {\n        width: \"100%\",\n        height: \"180\",\n        xmlns: \"http://www.w3.org/2000/svg\",\n        preserveAspectRatio: \"xMidYMid slice\",\n        focusable: \"false\",\n        role: \"img\",\n        \"aria-label\": \"Placeholder: Image cap\"\n      }\n    });\n  }\n};\nvar projectCard = {\n  name: 'project-card',\n  render: function render() {\n    var h = arguments[0];\n    return h(\"router-link\", {\n      attrs: {\n        to: \"/project/123\"\n      },\n      \"class\": \"card bg-secondary text-white\",\n      style: \"width:100%;margin-bottom:20px\"\n    }, [h(FakeImage, {\n      \"class\": \"card-img\"\n    }), h(\"div\", {\n      \"class\": \"card-img-overlay\"\n    }, [h(\"h5\", {\n      \"class\": \"card-title\"\n    }, [\"\\u9879\\u76EE\\u540D\\u5B57\"]), h(\"p\", {\n      \"class\": \"card-text\"\n    }, [\"\\u9879\\u76EE\\u63CF\\u8FF0\\u9879\\u76EE\\u63CF\\u8FF0\\u9879\\u76EE\\u63CF\\u8FF0\"])])]);\n  }\n};\nvar projectList = {\n  components: {\n    projectCard: projectCard\n  },\n  data: function data() {\n    return {\n      listView: 1\n    };\n  },\n  render: function render() {\n    var h = arguments[0];\n    var list = this.listView === 0 ? h(\"div\", {\n      \"class\": \"row\"\n    }, [h(\"div\", {\n      \"class\": \"col-12\"\n    }, [h(\"div\", {\n      \"class\": \"list-group\"\n    }, [h(\"router-link\", {\n      attrs: {\n        to: \"/project/123\"\n      },\n      \"class\": \"list-group-item list-group-item-action mb-4\"\n    }, [h(\"div\", {\n      \"class\": \"d-flex w-100 justify-content-between\"\n    }, [h(\"h5\", {\n      \"class\": \"mb-1\"\n    }, [\"List group item heading\"]), h(\"small\", [\"\\u4E09\\u5929\\u524D\"])]), h(\"p\", {\n      \"class\": \"mb-1\"\n    }, [\"\\u9879\\u76EE\\u63CF\\u8FF0\"])]), h(\"router-link\", {\n      attrs: {\n        to: \"/project/123\"\n      },\n      \"class\": \"list-group-item list-group-item-action mb-4\"\n    }, [h(\"div\", {\n      \"class\": \"d-flex w-100 justify-content-between\"\n    }, [h(\"h5\", {\n      \"class\": \"mb-1\"\n    }, [\"List group item heading\"]), h(\"small\", {\n      \"class\": \"text-muted\"\n    }, [\"\\u4E09\\u5929\\u524D\"])]), h(\"p\", {\n      \"class\": \"mb-1\"\n    }, [\"\\u9879\\u76EE\\u63CF\\u8FF0\"])]), h(\"router-link\", {\n      attrs: {\n        to: \"/project/123\"\n      },\n      \"class\": \"list-group-item list-group-item-action mb-4\"\n    }, [h(\"div\", {\n      \"class\": \"d-flex w-100 justify-content-between\"\n    }, [h(\"h5\", {\n      \"class\": \"mb-1\"\n    }, [\"List group item heading\"]), h(\"small\", {\n      \"class\": \"text-muted\"\n    }, [\"\\u4E09\\u5929\\u524D\"])]), h(\"p\", {\n      \"class\": \"mb-1\"\n    }, [\"\\u9879\\u76EE\\u63CF\\u8FF0\"])])])])]) : h(\"div\", {\n      \"class\": \"row\"\n    }, [h(\"div\", {\n      \"class\": \"col-md-6 col-xl-4\"\n    }, [h(\"project-card\")]), h(\"div\", {\n      \"class\": \"col-md-6 col-xl-4\"\n    }, [h(\"project-card\")]), h(\"div\", {\n      \"class\": \"col-md-6 col-xl-4\"\n    }, [h(\"project-card\")]), h(\"div\", {\n      \"class\": \"col-md-6 col-xl-4\"\n    }, [h(\"project-card\")]), h(\"div\", {\n      \"class\": \"col-md-6 col-xl-4\"\n    }, [h(\"project-card\")]), h(\"div\", {\n      \"class\": \"col-md-6 col-xl-4\"\n    }, [h(\"project-card\")]), h(\"div\", {\n      \"class\": \"col-md-6 col-xl-4\"\n    }, [h(\"project-card\")]), h(\"div\", {\n      \"class\": \"col-md-6 col-xl-4\"\n    }, [h(\"project-card\")])]);\n    return h(\"div\", {\n      \"class\": \"container project-list\"\n    }, [h(\"div\", {\n      \"class\": \"row justify-content-space-between align-items-center\"\n    }, [h(\"div\", {\n      \"class\": \"col-6\"\n    }, [h(\"h1\", {\n      \"class\": \"display-4\"\n    }, [\"\\u56E2\\u961F\"])]), h(\"div\", {\n      \"class\": \"col-6 text-right\"\n    }, [h(\"button\", {\n      \"class\": \"btn btn-light\",\n      on: {\n        \"click\": this.toggleListView\n      }\n    }, [this.listView === 0 ? '卡片' : '列表', \"\\u89C6\\u56FE\"])])]), h(\"br\"), list, h(\"div\", {\n      \"class\": \"row\"\n    }, [h(\"div\", {\n      \"class\": \"col-sm-12 col-md-6 col-lg-3 col-xl-2\"\n    }, [h(\"button\", {\n      attrs: {\n        type: \"button\"\n      },\n      \"class\": \"btn btn-lg btn-block btn-primary mb-3\"\n    }, [\"\\u65B0\\u5EFA\\u9879\\u76EE\"])]), h(\"div\", {\n      \"class\": \"col-sm-12 col-md-6 col-lg-3 col-xl-2\"\n    }, [h(\"button\", {\n      attrs: {\n        type: \"button\"\n      },\n      \"class\": \"btn btn-lg btn-block btn-secondary\"\n    }, [\"\\u56E2\\u961F\\u8BBE\\u7F6E\"])])])]);\n  },\n  methods: {\n    toggleListView: function toggleListView() {\n      this.listView = this.listView === 0 ? 1 : 0;\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (projectList);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvcHJvamVjdC9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9wYWdlcy9wcm9qZWN0L2luZGV4LmpzPzYyY2IiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRmFrZUltYWdlID0ge1xuICBuYW1lOiAnZmFrZS1pbWFnZScsXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxODBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIHNsaWNlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbD1cIlBsYWNlaG9sZGVyOiBJbWFnZSBjYXBcIj48L3N2Zz5cbiAgICApXG4gIH1cbn1cblxuY29uc3QgcHJvamVjdENhcmQgPSB7XG4gIG5hbWU6ICdwcm9qZWN0LWNhcmQnLFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9wcm9qZWN0LzEyM1wiIGNsYXNzPVwiY2FyZCBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZVwiIHN0eWxlPVwid2lkdGg6MTAwJTttYXJnaW4tYm90dG9tOjIwcHhcIj5cbiAgICAgICAgPEZha2VJbWFnZSBjbGFzcz1cImNhcmQtaW1nXCIvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pbWctb3ZlcmxheVwiPlxuICAgICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIj7pobnnm67lkI3lrZc8L2g1PlxuICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+6aG555uu5o+P6L+w6aG555uu5o+P6L+w6aG555uu5o+P6L+wPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgKVxuICB9XG59XG5cbmNvbnN0IHByb2plY3RMaXN0ID0ge1xuICBjb21wb25lbnRzOiB7XG4gICAgcHJvamVjdENhcmRcbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdFZpZXc6IDFcbiAgICB9XG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0VmlldyA9PT0gMCA/IChcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwXCI+XG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvcHJvamVjdC8xMjNcIiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uIG1iLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCB3LTEwMCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cIm1iLTFcIj5MaXN0IGdyb3VwIGl0ZW0gaGVhZGluZzwvaDU+XG4gICAgICAgICAgICAgICAgPHNtYWxsPuS4ieWkqeWJjTwvc21hbGw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cIm1iLTFcIj7pobnnm67mj4/ov7A8L3A+XG4gICAgICAgICAgICA8L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3Byb2plY3QvMTIzXCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvbiBtYi00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDAganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtYi0xXCI+TGlzdCBncm91cCBpdGVtIGhlYWRpbmc8L2g1PlxuICAgICAgICAgICAgICAgIDxzbWFsbCBjbGFzcz1cInRleHQtbXV0ZWRcIj7kuInlpKnliY08L3NtYWxsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtYi0xXCI+6aG555uu5o+P6L+wPC9wPlxuICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9wcm9qZWN0LzEyM1wiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb24gbWItNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IHctMTAwIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVwibWItMVwiPkxpc3QgZ3JvdXAgaXRlbSBoZWFkaW5nPC9oNT5cbiAgICAgICAgICAgICAgICA8c21hbGwgY2xhc3M9XCJ0ZXh0LW11dGVkXCI+5LiJ5aSp5YmNPC9zbWFsbD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwibWItMVwiPumhueebruaPj+i/sDwvcD5cbiAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKSA6IChcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC14bC00XCI+XG4gICAgICAgICAgPHByb2plY3QtY2FyZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC14bC00XCI+XG4gICAgICAgICAgPHByb2plY3QtY2FyZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC14bC00XCI+XG4gICAgICAgICAgPHByb2plY3QtY2FyZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC14bC00XCI+XG4gICAgICAgICAgPHByb2plY3QtY2FyZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC14bC00XCI+XG4gICAgICAgICAgPHByb2plY3QtY2FyZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC14bC00XCI+XG4gICAgICAgICAgPHByb2plY3QtY2FyZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC14bC00XCI+XG4gICAgICAgICAgPHByb2plY3QtY2FyZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC14bC00XCI+XG4gICAgICAgICAgPHByb2plY3QtY2FyZCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHByb2plY3QtbGlzdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY29udGVudC1zcGFjZS1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgICAgPGgxIGNsYXNzPVwiZGlzcGxheS00XCI+5Zui6ZifPC9oMT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTYgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlnaHRcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnRvZ2dsZUxpc3RWaWV3fVxuICAgICAgICAgICAgPnt0aGlzLmxpc3RWaWV3ID09PSAwID8gJ+WNoeeJhycgOiAn5YiX6KGoJ33op4blm748L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxici8+XG4gICAgICAgIHtsaXN0fVxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtNiBjb2wtbGctMyBjb2wteGwtMlwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxnIGJ0bi1ibG9jayBidG4tcHJpbWFyeSBtYi0zXCI+5paw5bu66aG555uuPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtNiBjb2wtbGctMyBjb2wteGwtMlwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxnIGJ0bi1ibG9jayBidG4tc2Vjb25kYXJ5XCI+5Zui6Zif6K6+572uPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlTGlzdFZpZXcoKSB7XG4gICAgICB0aGlzLmxpc3RWaWV3ID0gdGhpcy5saXN0VmlldyA9PT0gMCA/IDEgOiAwXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RMaXN0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBTkE7QUFTQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUlBO0FBWkE7QUFlQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFHQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQU1BO0FBQUE7QUFDQTtBQUFBO0FBR0E7QUFBQTtBQUdBO0FBQUE7QUFHQTtBQUFBO0FBR0E7QUFBQTtBQUdBO0FBQUE7QUFHQTtBQUFBO0FBR0E7QUFBQTtBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFFQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBUUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUE3RkE7QUFvR0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/project/index.js\n");

/***/ })

}]);