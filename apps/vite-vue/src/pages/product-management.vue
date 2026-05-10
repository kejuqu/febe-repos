<script setup lang="tsx">
  import { ref, unref } from 'vue';
  import { ElCheckbox } from 'element-plus';

  import type { FunctionalComponent } from 'vue';
  import type { CheckboxValueType, Column } from 'element-plus';

  type SelectionCellProps = {
    value: boolean;
    intermediate?: boolean;
    onChange: (value: CheckboxValueType) => void;
  };

  const SelectionCell: FunctionalComponent<SelectionCellProps> = ({
    value,
    intermediate,
    onChange,
  }) => {
    return <ElCheckbox v-model={value} indeterminate={intermediate} onChange={onChange} />;
  };

  const generateColumns = (length = 10, prefix = 'column-', props?: any): Columns<> => {
    // Array.from({ length }).map((_, columnIndex) => ({
    //   ...props,
    //   key: `${prefix}${columnIndex}`,
    //   dataKey: `${prefix}${columnIndex}`,
    //   title: `Column ${columnIndex}`,
    //   width: 150,
    // }));

    return [
      {
        dataKey: 'name',
        title: 'Name',
        fixed: true,
      },
      {
        dataKey: 'desc',
        title: 'Description',
      },
      {
        dataKey: 'category',
        title: '种类',
      },
      {
        dataKey: 'price',
        title: '价格',
      },
      {
        dataKey: 'stock',
        title: '库存',
      },
      {
        dataKey: 'status',
        title: '状态',
      },
      {
        dataKey: 'createdAt',
        title: '创建时间',
      },
      {
        dataKey: 'actions',
        title: '操作',
        cellRenderer: (params) => {
          return (
            <div>
              <el-button type="primary" size="small">
                编辑
              </el-button>
              <el-button type="danger" size="small">
                删除
              </el-button>
            </div>
          );
        },
      },
    ];
  };

  const generateData = (
    columns: ReturnType<typeof generateColumns>,
    length = 200,
    prefix = 'row-'
  ) =>
    Array.from({ length }).map((_, rowIndex) => {
      return columns.reduce(
        (rowData, column, columnIndex) => {
          rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
          return rowData;
        },
        {
          id: `${prefix}${rowIndex}`,
          checked: false,
          parentId: null,
        }
      );
    });

  const columns: Column<any>[] = generateColumns(10);
  const data = ref(generateData(columns, 200));

  columns.unshift({
    key: 'selection',
    width: 50,
    cellRenderer: ({ rowData }) => {
      const onChange = (value: CheckboxValueType) => (rowData.checked = value);

      return <SelectionCell value={rowData.checked} onChange={onChange} />;
    },
    headerCellRenderer: () => {
      const _data = unref(data);

      const onChange = (value: CheckboxValueType) => {
        data.value = _data.map((row) => {
          row.checked = value;
          return row;
        });
      };

      const allSelected = _data.every((row) => row.checked);
      const containsChecked = _data.some((row) => row.checked);

      return (
        <SelectionCell
          value={allSelected}
          intermediate={containsChecked && !allSelected}
          onChange={onChange}
        />
      );
    },
  });
</script>

<template>
  <div style="height: 400px; color: black">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2 :columns="columns" :data="data" :height="height" :width="width" />
      </template>
    </el-auto-resizer>
  </div>
</template>
