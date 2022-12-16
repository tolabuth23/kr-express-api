import { Body, Controller, Post } from '@nestjs/common'
import { SequenceService } from './sequence.service'
import { CreateSequenceDto } from './dto/create-sequence.dto'
import { Sequence } from './sequence.schema'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Sequence Test')
@Controller()
export class SequenceController {
  constructor(private sequenceService: SequenceService) {}
}
