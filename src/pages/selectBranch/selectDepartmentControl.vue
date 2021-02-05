
<template>
  <div class="layout">
    <Layout style="height: 100vh;">
      <Sider :width="251" style="background: #343957;">
        <div>
          <img src="@/common/images/photo.png" style="background: #343957;" />
        </div>
        <Menu width="100%" :active-name="fullPath" accordion>
          <MenuItem
            name="controlentirety"
            to="/departmentControl/control"
          >
            <Icon type="ios-settings" />
            <span>项目管理</span>
          </MenuItem>

          <MenuItem name="personnel" to="/departmentControl/personnel" v-if="identity.isCounter==true">
            <Icon type="ios-paper" />
            <span>人员管理</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header
          :style="{background: '#fff', height: '70px',boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
          class="layout-header-bar"
        >
          <div class="layout-header-title" id="theTitle">
            <Icon :type="type" />
            {{title}}
          </div>
          <div class="user">
            <div style="margin-top:-1px;"><Avatar  size="small" shape="square" icon="ios-person" /></div>
            <Dropdown>           
              <a href="javascript:void(0)" class="name">
                学院管理员：{{username}}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list" style="padding-top:2px">
                <DropdownItem @click.native="switchIdentity(1)" v-if="identity.isControler==true">系统管理员</DropdownItem>
                <DropdownItem @click.native="switchIdentity(2)" v-if="identity.isDepartmentControler==true">学院管理员</DropdownItem>
                <DropdownItem @click.native="switchIdentity(3)" v-if="identity.isDepartmentControler==true || identity.isControler==true">普通用户</DropdownItem>
                <DropdownItem divided @click.native="logout">
                  登出 &nbsp;
                  <Icon type="ios-log-out" />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content
          :style="{margin: '15px', background: '#f9fafc'}"
          style="height:100vh"
          class="main;margin-top:-20px;"
        >
          <GeminiScrollbar class="my-scroll-bar">
            <router-view></router-view>
          </GeminiScrollbar>
        </Content>
        <!--页面部分-->
      </Layout>
      <!--右边部分-->
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      username: "",
      type: "",
      openname: "",
      identity: "",
      fullPath:"",
    };
  },

  methods: {
   handleCommand(command) {
      if (command == "logout") {
        localStorage.clear();
        axios({
          url: "https://oauth.shu.edu.cn/oauth/logout",
          // url: `${apiPath}/login`,
          method: "get",
          params: {
            retUrl: "http://vote.shu.edu.cn"
          }
        })
          .then(res => {
            this.$Notice.success({ title: `登出成功` });
          })
          .catch(err => {
            this.$Notice.warning({ title: `发生错误：${err}` });
          });
      }
    },
    switchIdentity(index) {
      if (index == 1) {
        this.$router.push({ path: "/systemControl/control" });
      } else if (index == 3) {
        if (this.identity.isCounter == true) {
          this.$router.push({ path: "/select/count" });
        } else {
          this.$router.push({ path: "/select/vote" });
        }
      }else{
          this.$router.push({ path: "/departmentControl/control" });
      }
    },
    initIdentity() {
        this.fullPath = this.$route.name;
      if (this.$route.name == "controlentirety") {
        this.title = "项目管理";
        this.type = "ios-settings";
      } else if (this.$route.name == "personnel") {
        this.title = "人员管理";
        this.type = "ios-paper";
      } else {
        this.title = localStorage.getItem("projectName");
        var headerTitle = document.getElementById("theTitle");

        if (this.title.length >= 40) {
          headerTitle.style.fontSize = "20px";
        } else if (this.title.length >= 30) {
          headerTitle.style.fontSize = "25px";
        } else if (this.title.length >= 20) {
          headerTitle.style.fontSize = "30px";
        }
        this.type = "ios-pie";
      }
    },
     logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push("/login");
      localStorage.setItem("logout", "comfirm");
    }
  },

  computed: {
    // fullPath() {
    //   if (this.identity.isControler == true) {
    //     return "controlentirety";
    //   } else if (this.identity.isCounter == true) {
    //     return "onlineentirety";
    //   } else {
    //     return "votespecifics";
    //   }
    // }
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.initIdentity();
    this.identity = JSON.parse(localStorage.getItem("identity"));
  },

  watch: {
    $route() {
      this.initIdentity();
    }
  }
};
</script>
<style scoped lang="scss">
@import "./select";
</style>
<style  lang="scss">
.ivu-menu-submenu-title {
  // display: flex;
  background: #343957;
  font-size: 18px;
  font-weight: normal;
  // align-content: center !important;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #c6d7f2;

  i {
    // display: flex;
    align-items: center;
  }
}

.user {
  position: relative;
  float: right;
  right: 0%;
  font-size: 20px;
  width: 350px;
  top: 6%;
  display: flex;
}
.name {
  color: #484848;
  margin-left: -20px;
}

.name:hover {
  color: darkslategray;
}

.el-dropdown-link {
  // position:relative;
  cursor: pointer;
  color: #171a14;
  font-size: 24px;
  // display: flex;
}
.el-icon-arrow-down {
  font-size: 24px;
}
</style>
<style>
</style>
