<template>
  <!-- 图层选择 -->
  <div class="layerControl">
    <el-dropdown trigger="click" tabindex="0">
      <el-button color="#626aef" plain>
        图层列表 <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            ><el-tree
              v-if="isShowTree"
              ref="treeRef"
              :data="layerData"
              :props="defaultProps"
              :default-checked-keys="defalutCheck"
              :default-expanded-keys="defalutCheck"
              node-key="id"
              show-checkbox
              accordion
              @click="getNode"
              @check="handleCheckChange"
          /></el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { computed, inject, onMounted, ref, watch } from 'vue'

const map = inject('map')
const treeRef = ref(null)

const layerData = ref([
  {
    label: '天地图图层',
    children: []
  }
])

const defaultProps = {
  children: 'children',
  label: 'label'
}

const handleCheckChange = (data) => {
  const { label, checked } = treeRef.value.getNode(data)
  mapLayers.value[label].setVisible(checked)
}

const getNode = () => {}

// 图层操作
// map中图层数组
const mapLayers = ref([])
// 默认选中
const defalutCheck = ref([])
// 展示tree
const isShowTree = ref(false)

// 加载图层列表数据
const loadLayersControl = (map) => {
  // 获取地图实例中的图层
  const layers = map.getLayers()
  let layerName = ''
  layers.forEach((item) => {
    layerName = item.get('name')
    mapLayers.value[layerName] = item
    layerData.value[0].children.push({
      id: parseInt(item.ol_uid),
      label: item.get('name')
    })
    defalutCheck.value.push(parseInt(item.ol_uid))
  })
  console.log(mapLayers.value)
  isShowTree.value = true
}

onMounted(() => {
  loadLayersControl(map)
})
</script>

<style lang="scss" scoped></style>
