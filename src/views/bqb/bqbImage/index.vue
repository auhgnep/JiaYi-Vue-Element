<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="文件名称" prop="filename">
        <el-input
          v-model="queryParams.filename"
          placeholder="请输入文件名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文件网址" prop="url">
        <el-input
          v-model="queryParams.url"
          placeholder="请输入文件网址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input
          v-model="queryParams.path"
          placeholder="请输入路径"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文件后缀" prop="suffix">
        <el-input
          v-model="queryParams.suffix"
          placeholder="请输入文件后缀"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="路由参数" prop="tag">
        <el-input
          v-model="queryParams.tag"
          placeholder="请输入路由参数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否为gif" prop="isGif">
        <el-input
          v-model="queryParams.isGif"
          placeholder="请输入是否为gif"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleUpload"
          v-hasPermi="['bqb:bqbImage:add']"
        >上传</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['bqb:bqbImage:add']"
        >新增</el-button>
      </el-col>
      
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['bqb:bqbImage:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['bqb:bqbImage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['bqb:bqbImage:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bqbImageList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="图片ID" align="center" prop="imageId" />
      <el-table-column label="文件名称" align="center" prop="filename" />
      <el-table-column label="文件网址" align="center" prop="url" />
      <el-table-column label="路径" align="center" prop="path" />
      <el-table-column label="文件类型" align="center" prop="fileType" />
      <el-table-column label="文件后缀" align="center" prop="suffix" />
      <el-table-column label="标签" align="center" prop="tag" />
      <el-table-column label="是否为gif" align="center" prop="isGif" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['bqb:bqbImage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bqb:bqbImage:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改表情包图片对话框 -->
    <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文件名称" prop="filename">
          <el-input v-model="form.filename" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item label="文件网址" prop="url">
          <el-input v-model="form.url" placeholder="请输入文件网址" :disabled="form.imageId" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="form.path" placeholder="请输入路径" />
        </el-form-item>
        <el-form-item label="文件后缀" prop="suffix">
          <el-input v-model="form.suffix" placeholder="请输入文件后缀" />
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="form.tag" placeholder="请输入标签" />
        </el-form-item>
        <el-form-item label="是否为gif" prop="isGif">
          <el-input v-model="form.isGif" placeholder="请输入是否为gif" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 上传对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" :close-on-click-modal="false" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".gif, .png, .jpg, .jpeg"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :auto-upload="false"
        :on-change="handleFileChange"
        :file-list="fileList"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入gif、png、jpg等格式图片。</span>
        </div>
      </el-upload>
      <!-- <el-upload
        ref="upload"
        :limit="1"
        accept=".gif, .png, .jpg, .jpeg"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入gif、pgn、jpg等格式图片。</span>
        </div>
      </el-upload> -->
      <el-form ref="uploadForm" :model="uploadForm" label-width="80px">
        <el-form-item label="文件名称" prop="filename">
          <el-input v-model="uploadForm.filename" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item label="标签" prop="url">
          <el-input v-model="uploadForm.tag" placeholder="请输入标签" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBqbImage, getBqbImage, delBqbImage, addBqbImage, updateBqbImage, delBqb } from "@/api/bqb/bqbImage";
import { getToken } from "@/utils/auth";
import axios from 'axios'

export default {
  name: "BqbImage",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表情包图片表格数据
      bqbImageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        filename: null,
        url: null,
        path: null,
        fileType: null,
        suffix: null,
        tag: null,
        isGif: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        filename: [
          { required: true, message: "文件名称不能为空", trigger: "blur" }
        ],
      },
      // 上传参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/bqb/bqbImage/add"
      },
      // 上传接口传入参数
      uploadForm: {
        filename: '',
        tag: ''
      },
      fileList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询表情包图片列表 */
    getList() {
      this.loading = true;
      listBqbImage(this.queryParams).then(response => {
        this.bqbImageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        imageId: null,
        filename: null,
        url: null,
        path: null,
        fileType: null,
        suffix: null,
        tag: null,
        isGif: null,
        status: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.imageId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加表情包图片";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const imageId = row.imageId || this.ids
      getBqbImage(imageId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改表情包图片";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.imageId != null) {
            updateBqbImage(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBqbImage(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const imageIds = row.imageId || this.ids;
      this.$modal.confirm('是否确认删除表情包图片编号为"' + imageIds + '"的数据项？').then(function() {
        // return delBqbImage(imageIds);
        return delBqb(imageIds)
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bqb/bqbImage/export', {
        ...this.queryParams
      }, `bqbImage_${new Date().getTime()}.xlsx`)
    },

    /** 上传图片按钮操作 */
    handleUpload() {
      this.upload.title = "上传图片";
      this.upload.open = true;
      this.fileList = []; // 重置文件列表
      this.uploadForm = {
        filename: null,
        tag: null
      };
    },

    // 文件状态改变时的钩子
    handleFileChange(file, fileList) {
      this.fileList = fileList;

      console.log(fileList)
      if (fileList && fileList.length > 0) {
        this.uploadForm.filename = fileList[0].name
      } else {
        this.uploadForm.filename = null
      }
      
    },

    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    
    // 提交上传文件
    submitFileForm() {
      if (this.fileList.length === 0) {
        this.$message.warning('请选择要上传的文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.fileList[0].raw);
      formData.append('filename', this.uploadForm.filename);
      formData.append('tag', this.uploadForm.tag);

      this.upload.isUploading = true;

      axios.post(this.upload.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + getToken()
        }
      }).then(response => {
        this.handleFileSuccess(response.data);
      }).catch(error => {
        this.$message.error('上传失败：' + error.message);
      }).finally(() => {
        this.upload.isUploading = false;
      });
    },

    handleFileSuccess(response) {
      this.upload.open = false;
      this.fileList = [];
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "上传结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
  }
};
</script>
