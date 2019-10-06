<template>
    <div>
        <el-table v-loading="loading" :data="playlist" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="copywriter" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该歌单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
import { fetchList,del } from '@/api/playlist'
import scroll from '@/utils/scroll'
export default {
    data() {
        return {
            playlist: [],
            count: 50,
            loading: false,
            delDialogVisible: false,
            info: {}
        }
    },
    created() {
        this.getList()
    },
    mounted() {
        scroll.start(this.getList)
        // console.log(scroll.start())
    },
    methods:{
        getList() {
            this.loading = true
            fetchList({
                start: this.playlist.length,
                count: this.count
            }).then(res => {
                // console.log(res)
                this.playlist = this.playlist.concat(res.data)
                if (res.data.length < this.count) {
                    scroll.end()
                }
                this.loading = false
            })
        },
        onEdit(row){
            this.$router.push(`/playlist/edit/${row._id}`)
        },
        onDel(row){
            this.delDialogVisible = true,
            this.info.id= row._id
        },
        doDel(){
            
            //往后端发送请求操纵数据库
            del({id: this.info.id}).then(res=>{
                this.delDialogVisible = false 
                if(res.data.deleted > 0){
                    //清空列表 重新获取新的列表
                    this.playlist = []
                    this.getList()
                    //打印提示
                    this.$message({
                        message:'删除成功',
                        type: 'success'
                    })
                }else {
                    this.$message.error('删除失败')
                }
            })
        }
    }
}
</script>
