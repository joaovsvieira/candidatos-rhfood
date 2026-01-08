<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { vMaska } from 'maska/vue'

const route = useRoute()
const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl

const toast = useToast()
const user = useSanctumUser<User>()

definePageMeta({
  middleware: ['sanctum:auth']
})

const pcdItems = ref(['Auditiva', 'Visual', 'Intelectual', 'Física'])

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MIN_DIMENSIONS = { width: 200, height: 200 }
const MAX_DIMENSIONS = { width: 4096, height: 4096 }
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
  avatar: z.instanceof(File, { message: 'Foto é obrigatório.' })
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: `A imagem é muito grande. Por favor, escolha uma imagem menor que ${formatBytes(MAX_FILE_SIZE)}.`
    })
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Por favor, envie uma imagem válida (JPEG, PNG, or WebP).'
    })
    .refine(
      file =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
              const meetsDimensions
                = img.width >= MIN_DIMENSIONS.width
                  && img.height >= MIN_DIMENSIONS.height
                  && img.width <= MAX_DIMENSIONS.width
                  && img.height <= MAX_DIMENSIONS.height
              resolve(meetsDimensions)
            }
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }),
      {
        message: `A dimensão da imagem é inválida. Por favor, envie uma imagem entre ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} e ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
      }
    )
    .optional()
    .nullable(),
  full_name: z.string().min(1, 'Nome é obrigatório'),
  date_of_birth: z.string().min(1, 'Data de Nascimento é obrigatório'),
  pcd: z.array(z.string()),
  contact_phone: z.string().min(1, 'Telefone para contato é obrigatório'),
  address_zipcode: z.string().min(1, 'CEP é obrigatório'),
  address_state: z.string().min(1, 'Estado é obrigatório'),
  address_city: z.string().min(1, 'Cidade é obrigatório'),
  address_district: z.string().min(1, 'Bairro é obrigatório'),
  address_street: z.string().min(1, 'Logradouro/Rua/Avenida é obrigatório'),
  curriculum: z.instanceof(File, { message: 'Currículo é obrigatório' }).optional().nullable()
})

interface FormState {
  avatar: File | undefined
  avatar_url: string
  full_name: string
  date_of_birth: string
  pcd: string[]
  contact_phone: string
  address_zipcode: string
  address_state: string
  address_city: string
  address_district: string
  address_street: string
  curriculum: File | undefined
}

const state = reactive<FormState>({
  avatar: undefined,
  avatar_url: user.value?.avatar_url || '',
  full_name: user.value?.name || '',
  date_of_birth: user.value?.date_of_birth || '',
  pcd: user.value?.pwd || [],
  contact_phone: user.value?.contact_phone || '',
  address_zipcode: user.value?.address_zipcode || '',
  address_state: user.value?.address_state || '',
  address_city: user.value?.address_city || '',
  address_district: user.value?.address_district || '',
  address_street: user.value?.address_street || '',
  curriculum: undefined
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const formData = new FormData()

  formData.append('full_name', state.full_name)
  formData.append('date_of_birth', state.date_of_birth)
  formData.append('contact_phone', state.contact_phone)
  formData.append('address_zipcode', state.address_zipcode)
  formData.append('address_state', state.address_state)
  formData.append('address_city', state.address_city)
  formData.append('address_district', state.address_district)
  formData.append('address_street', state.address_street)

  if (state.avatar) {
    formData.append('avatar', state.avatar)
  }

  if (state.curriculum) {
    formData.append('curriculum', state.curriculum)
  }

  state.pcd.forEach((item) => {
    formData.append('pwd[]', item)
  })

  try {
    const token = await getCsrfToken()

    if (!token) {
      toast.add({ title: 'Ocorreu um erro', description: 'Tente novamente, mais tarde.', color: 'error' })
      throw new Error('CSRF Token não foi obtido.')
    }

    await $fetch(`${API_BASE}/api/update-profile`, {
      method: 'POST',
      body: formData,
      headers: {
        'X-XSRF-TOKEN': token
      },
      credentials: 'include'
    })

    toast.add({ title: 'Perfil salvo com sucesso!', color: 'success' })
  } catch (e) {
    console.log(e)
    const error = useApiError(e)

    if (error.isValidationError) {
      Object.entries(error.bag).forEach((err) => {
        toast.add({ title: 'Ocorreu um erro', description: err[1][0], color: 'error' })
      })
    } else {
      toast.add({ title: 'Ocorreu um erro', description: 'Tente novamente, mais tarde.', color: 'error' })
    }
  }
}

function createObjectUrl(file: File): string {
  return URL.createObjectURL(file)
}

const fileInputRef = ref<HTMLInputElement | null>(null)

function handleFileClick() {
  fileInputRef.value?.click()
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement

  if (input.files && input.files.length > 0) {
    state.curriculum = input.files[0]
  }
}

const addressLoading = ref(false)

watch(
  () => state.address_zipcode,
  async (newZipcode) => {
    const cleanZipcode = newZipcode.replace(/\D/g, '')

    if (cleanZipcode.length === 8) {
      addressLoading.value = true

      try {
        const data: any = await $fetch(`https://viacep.com.br/ws/${cleanZipcode}/json/`)

        if (data.erro) {
          toast.add({ title: 'Erro', description: 'CEP não encontrado.', color: 'error' })
          return
        }

        state.address_state = data.uf || ''
        state.address_city = data.localidade || ''
        state.address_district = data.bairro || ''
        state.address_street = data.logradouro || ''
      } catch (error) {
        toast.add({ title: 'Erro', description: 'Falha ao buscar CEP.', color: 'error' })
      } finally {
        addressLoading.value = false
      }
    }
  }
)
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="`Olá, ${user?.name}`"
      description="Editar minha conta"
    />

    <div class="mt-5 mb-15 flex items-center justify-end space-x-2">
      <ULink
        as="button"
        to="/my-account"
      >
        Minhas Aplicações
      </ULink>
      <USeparator
        orientation="vertical"
        class="h-5"
      />
      <ULink
        as="button"
        to="/my-resumes"
      >
        Meus Curriculos
      </ULink>
    </div>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 max-w-md mx-auto mb-15"
      @submit="onSubmit"
    >
      <UFormField
        label="Foto"
        name="avatar"
      >
        <UFileUpload
          v-slot="{ open, removeFile }"
          v-model="state.avatar"
          accept="image/*"
        >
          <div class="flex flex-wrap items-center gap-3">
            <UAvatar
              size="3xl"
              :src="state.avatar ? createObjectUrl(state.avatar) : (API_BASE + '/storage/' + state.avatar_url ||undefined)"
              icon="i-lucide-image"
            />

            <UButton
              :label="state.avatar ? 'Trocar imagem' : 'Enviar imagem'"
              color="neutral"
              variant="outline"
              @click="open()"
            />
          </div>

          <p
            v-if="state.avatar"
            class="text-xs text-muted mt-1.5"
          >
            {{ state.avatar.name }}
          </p>

          <UButton
            v-if="state.avatar"
            label="Remover"
            color="error"
            variant="link"
            size="xs"
            class="p-0"
            @click="removeFile()"
          />
        </UFileUpload>
      </UFormField>

      <UFormField
        label="Nome completo*"
        name="full_name"
        class="mt-8"
      >
        <UInput
          v-model="state.full_name"
          class="w-full"
          aria-required="true"
        />
      </UFormField>

      <UFormField
        label="Data de Nascimento*"
        name="date_of_birth"
      >
        <UInput
          v-model="state.date_of_birth"
          v-maska="'##/##/####'"
          class="w-full"
          placeholder="DD/MM/AAAA"
          aria-required="true"
        />
      </UFormField>

      <UFormField
        label="PcD"
        name="pcd"
      >
        <UCheckboxGroup
          v-model="state.pcd"
          :items="pcdItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="Telefone para contato*"
        name="contact_phone"
      >
        <UInput
          v-model="state.contact_phone"
          v-maska="'(##) # ####-####'"
          placeholder="(XX) X XXXX-XXXX"
          class="w-full"
          aria-required="true"
        />
      </UFormField>

      <div class="grid grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-4 lg:gap-y-0 mt-8">
        <UFormField
          label="CEP*"
          name="address_zipcode"
          class="col-span-3 lg:col-span-2"
        >
          <UInput
            v-model="state.address_zipcode"
            v-maska="'##.###-###'"
            placeholder="XX.XXX-XXX"
            class="w-full"
            :loading="addressLoading"
            aria-required="true"
          />
        </UFormField>

        <UFormField
          label="Estado*"
          name="address_state"
        >
          <UInput
            v-model="state.address_state"
            class="w-full"
            aria-required="true"
          />
        </UFormField>

        <UFormField
          label="Cidade*"
          name="address_city"
          class="col-span-2 lg:col-span-3"
        >
          <UInput
            v-model="state.address_city"
            class="w-full"
            aria-required="true"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-4 gap-y-4 lg:gap-y-0">
        <UFormField
          label="Bairro*"
          name="address_district"
          class="lg:col-span-2"
        >
          <UInput
            v-model="state.address_district"
            class="w-full"
            aria-required="true"
          />
        </UFormField>

        <UFormField
          label="Logradouro/Rua/Avenida*"
          name="address_street"
          class="lg:col-span-2"
        >
          <UInput
            v-model="state.address_street"
            class="w-full"
            aria-required="true"
          />
        </UFormField>
      </div>

      <UFormField
        label="Currículo (anexar arquivo)"
        name="curriculum"
        class="mt-8"
      >
        <input
          ref="fileInputRef"
          type="file"
          class="hidden"
          accept=".pdf,.doc,.docx"
          @change="onFileChange"
        >
        <div class="flex items-center gap-3">
          <UButton
            icon="i-lucide-upload"
            color="neutral"
            variant="outline"
            @click="handleFileClick"
          >
            Selecionar Arquivo
          </UButton>

          <span class="text-sm text-gray-500 truncate max-w-50">
            {{ state.curriculum ? state.curriculum.name : 'Nenhum arquivo selecionado' }}
          </span>

          <UButton
            v-if="state.curriculum"
            icon="i-lucide-x"
            color="gray"
            variant="ghost"
            size="xs"
            @click="state.curriculum = undefined"
          />
        </div>
      </UFormField>

      <UButton
        type="submit"
        class="w-full mt-8"
        variant="subtle"
        size="xl"
      >
        Salvar
      </UButton>
    </UForm>
  </UContainer>
</template>
