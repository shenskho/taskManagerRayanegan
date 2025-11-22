import React, { useEffect, useCallback } from 'react'
import DataGrid, { Column, Paging, SearchPanel, Toolbar, Item } from 'devextreme-react/data-grid'
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { downloadReportThunk, loadReportsThunk, uploadReportThunk } from '@store/slices/reportSlice'

const uploadSchema = yup.object().shape({
  file: yup
    .mixed()
    .required('انتخاب فایل الزامی است')
    .test('fileSize', 'حداکثر حجم ۵ مگابایت', (value) => !value?.[0] || value[0].size <= 5 * 1024 * 1024),
})

const Reports = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.reports)
  const { control, handleSubmit, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(uploadSchema),
    defaultValues: { file: null },
  })
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(loadReportsThunk())
  }, [dispatch])

  const handleDownload = useCallback(
    async (rowData) => {
      const result = await dispatch(downloadReportThunk({ id: rowData.id }))
      if (downloadReportThunk.fulfilled.match(result)) {
        const blob = result.payload
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `report-${rowData.id}.xlsx`
        link.click()
        URL.revokeObjectURL(url)
        toast.success(t('download'))
      }
    },
    [dispatch, t]
  )

  const onSubmit = async (values) => {
    const formData = new FormData()
    if (values.file?.[0]) {
      formData.append('file', values.file[0])
      const result = await dispatch(uploadReportThunk(formData))
      if (uploadReportThunk.fulfilled.match(result)) {
        toast.success(t('upload'))
        dispatch(loadReportsThunk())
        reset()
      }
    }
  }

  return (
    <div className="reports-page">
      <Card className="shadow-sm mb-3">
        <CardBody>
          <CardTitle tag="h5" className="mb-3">
            {t('upload')}
          </CardTitle>
          <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column flex-md-row align-items-md-end" noValidate>
            <FormGroup className="me-md-3 flex-grow-1">
              <Label for="file">{t('upload')}</Label>
              <Controller
                name="file"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input type="file" id="file" invalid={!!fieldState.error} onChange={(e) => field.onChange(e.target.files)} />
                    {fieldState.error ? <FormFeedback>{fieldState.error.message}</FormFeedback> : null}
                  </>
                )}
              />
            </FormGroup>
            <Button color="primary" type="submit" disabled={status === 'loading'}>
              {t('submit')}
            </Button>
          </Form>
        </CardBody>
      </Card>

      <Card className="shadow-sm">
        <CardBody>
          <CardTitle tag="h5" className="mb-3">
            {t('reports')}
          </CardTitle>
          <DataGrid dataSource={items} keyExpr="id" showBorders className="bg-white rounded" height={420}>
            <SearchPanel visible highlightCaseSensitive={false} width={240} />
            <Paging defaultPageSize={8} />
            <Toolbar>
              <Item location="after">
                <Button color="secondary" size="sm" onClick={() => dispatch(loadReportsThunk())}>
                  {t('refresh')}
                </Button>
              </Item>
            </Toolbar>
            <Column dataField="id" caption="#" width={80} />
            <Column dataField="title" caption="عنوان" />
            <Column dataField="owner" caption="ایجاد کننده" />
            <Column dataField="status" caption="وضعیت" width={120} />
            <Column
              type="buttons"
              width={160}
              caption="عملیات"
              cellRender={({ data }) => (
                <div className="d-flex gap-2">
                  <Button color="success" size="sm" onClick={() => handleDownload(data)}>
                    {t('download')}
                  </Button>
                </div>
              )}
            />
          </DataGrid>
        </CardBody>
      </Card>
    </div>
  )
}

export default Reports
