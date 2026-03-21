import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { z } from "zod";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

type FormHelpers = {
  setValue: (name: string, value: any) => void
  getValue: (name: string) => void
  setValues: (values: Record<string, any>) => void
}

type FieldType = {
  name: string
  label: string
  value?: string | number
  button?: {
    icon: React.ReactNode
    onClick: (value: any, helpers: FormHelpers) => void
  }
}

type Props = {
  open: boolean
  onClose: () => void
  title: string
  fields: FieldType[]
  schema?: z.ZodType
  onSave?: (data: Record<string, any>) => void
  onSaveButtonLabel: string
}

export function DefaultDialog({ open, onClose, title, fields, schema, onSave, onSaveButtonLabel }: Props) {

  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErros] = useState<Record<string, any>>({})

  const formHelpers: FormHelpers = {
    setValue: (name, value) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    },
    getValue: (name) => formData[name],
    setValues: (values) => {
      setFormData((prev) => ({
        ...prev,
        ...values
      }))
    }

  }

  const validateField = (name: string, value: any) => {

    if (!schema) return

    const result = schema.safeParse({
      ...formData,
      [name]: value
    })

    if (!result.success) {
      const issue = result.error.issues.find(
        (issue) => issue.path[0] === name
      )

      setErros((prev) => ({
        ...prev,
        [name]: issue?.message || ""
      }))
    }
    else {
      setErros((prev) => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    validateField(name, value)
  }

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (schema) {
      const result = schema.safeParse(formData)

      if (!result.success) {
        const fieldErros: Record<string, string> = {}

        result.error.issues.forEach(issue => {
          const field = issue.path[0] as string
          fieldErros[field] = issue.message
        })

        setErros(fieldErros)

        return
      }
    }

    onSave?.(formData)
    onClose()
  }

  useEffect(() => {
    const initialData: Record<string, any> = {}
    fields.forEach(field => {
      initialData[field.name] = field.value ?? ""
    })
    setFormData(initialData)
  }, [fields])

  useEffect(() => {
    setErros({})
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 pr-2">
          <FieldGroup>
            {fields?.map((field) => {
              const value = formData[field.name] || ""
              const hasError = !!errors[field.name]
              const isEmpty = !value
              const isDisabled = hasError || isEmpty

              return (
                <Field key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field?.button ? (
                    <InputGroup>
                      <InputGroupInput
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        onBlur={handleBlur}
                        aria-invalid={!!errors[field.name]}
                      />
                      <InputGroupAddon align="inline-end">
                        <button
                          type="button"
                          disabled={isDisabled}
                          onClick={() => field.button?.onClick(formData[field.name], formHelpers)}
                          className={`${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          {field.button?.icon}
                        </button>
                      </InputGroupAddon>
                    </InputGroup>
                  ) : (
                    <Input
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      onBlur={handleBlur}
                      aria-invalid={!!errors[field.name]}
                    />
                  )}
                  {errors[field.name] && (
                    <FieldError>{errors[field.name]}</FieldError>
                  )}
                </Field>
              )
            })}
          </FieldGroup>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline" onClick={onClose}>Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="cursor-pointer" type="submit">{onSaveButtonLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
