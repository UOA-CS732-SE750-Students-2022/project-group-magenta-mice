// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: libs/protocol/exchange.proto

#include "libs/protocol/exchange.pb.h"

#include <algorithm>

#include <google/protobuf/stubs/common.h>
#include <google/protobuf/stubs/port.h>
#include <google/protobuf/io/coded_stream.h>
#include <google/protobuf/wire_format_lite_inl.h>
#include <google/protobuf/descriptor.h>
#include <google/protobuf/generated_message_reflection.h>
#include <google/protobuf/reflection_ops.h>
#include <google/protobuf/wire_format.h>
// This is a temporary google only hack
#ifdef GOOGLE_PROTOBUF_ENFORCE_UNIQUENESS
#include "third_party/protobuf/version.h"
#endif
// @@protoc_insertion_point(includes)

namespace Sim {
namespace Protocol {
class LoginRequestDefaultTypeInternal {
 public:
  ::google::protobuf::internal::ExplicitlyConstructed<LoginRequest>
      _instance;
} _LoginRequest_default_instance_;
class LogoutRequestDefaultTypeInternal {
 public:
  ::google::protobuf::internal::ExplicitlyConstructed<LogoutRequest>
      _instance;
} _LogoutRequest_default_instance_;
}  // namespace Protocol
}  // namespace Sim
namespace protobuf_libs_2fprotocol_2fexchange_2eproto {
static void InitDefaultsLoginRequest() {
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  {
    void* ptr = &::Sim::Protocol::_LoginRequest_default_instance_;
    new (ptr) ::Sim::Protocol::LoginRequest();
    ::google::protobuf::internal::OnShutdownDestroyMessage(ptr);
  }
  ::Sim::Protocol::LoginRequest::InitAsDefaultInstance();
}

::google::protobuf::internal::SCCInfo<0> scc_info_LoginRequest =
    {{ATOMIC_VAR_INIT(::google::protobuf::internal::SCCInfoBase::kUninitialized), 0, InitDefaultsLoginRequest}, {}};

static void InitDefaultsLogoutRequest() {
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  {
    void* ptr = &::Sim::Protocol::_LogoutRequest_default_instance_;
    new (ptr) ::Sim::Protocol::LogoutRequest();
    ::google::protobuf::internal::OnShutdownDestroyMessage(ptr);
  }
  ::Sim::Protocol::LogoutRequest::InitAsDefaultInstance();
}

::google::protobuf::internal::SCCInfo<0> scc_info_LogoutRequest =
    {{ATOMIC_VAR_INIT(::google::protobuf::internal::SCCInfoBase::kUninitialized), 0, InitDefaultsLogoutRequest}, {}};

void InitDefaults() {
  ::google::protobuf::internal::InitSCC(&scc_info_LoginRequest.base);
  ::google::protobuf::internal::InitSCC(&scc_info_LogoutRequest.base);
}

::google::protobuf::Metadata file_level_metadata[2];
const ::google::protobuf::EnumDescriptor* file_level_enum_descriptors[1];

const ::google::protobuf::uint32 TableStruct::offsets[] GOOGLE_PROTOBUF_ATTRIBUTE_SECTION_VARIABLE(protodesc_cold) = {
  ~0u,  // no _has_bits_
  GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(::Sim::Protocol::LoginRequest, _internal_metadata_),
  ~0u,  // no _extensions_
  ~0u,  // no _oneof_case_
  ~0u,  // no _weak_field_map_
  GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(::Sim::Protocol::LoginRequest, key_),
  ~0u,  // no _has_bits_
  GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(::Sim::Protocol::LogoutRequest, _internal_metadata_),
  ~0u,  // no _extensions_
  ~0u,  // no _oneof_case_
  ~0u,  // no _weak_field_map_
};
static const ::google::protobuf::internal::MigrationSchema schemas[] GOOGLE_PROTOBUF_ATTRIBUTE_SECTION_VARIABLE(protodesc_cold) = {
  { 0, -1, sizeof(::Sim::Protocol::LoginRequest)},
  { 6, -1, sizeof(::Sim::Protocol::LogoutRequest)},
};

static ::google::protobuf::Message const * const file_default_instances[] = {
  reinterpret_cast<const ::google::protobuf::Message*>(&::Sim::Protocol::_LoginRequest_default_instance_),
  reinterpret_cast<const ::google::protobuf::Message*>(&::Sim::Protocol::_LogoutRequest_default_instance_),
};

void protobuf_AssignDescriptors() {
  AddDescriptors();
  AssignDescriptors(
      "libs/protocol/exchange.proto", schemas, file_default_instances, TableStruct::offsets,
      file_level_metadata, file_level_enum_descriptors, NULL);
}

void protobuf_AssignDescriptorsOnce() {
  static ::google::protobuf::internal::once_flag once;
  ::google::protobuf::internal::call_once(once, protobuf_AssignDescriptors);
}

void protobuf_RegisterTypes(const ::std::string&) GOOGLE_PROTOBUF_ATTRIBUTE_COLD;
void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::internal::RegisterAllTypes(file_level_metadata, 2);
}

void AddDescriptorsImpl() {
  InitDefaults();
  static const char descriptor[] GOOGLE_PROTOBUF_ATTRIBUTE_SECTION_VARIABLE(protodesc_cold) = {
      "\n\034libs/protocol/exchange.proto\022\014Sim.Prot"
      "ocol\"\033\n\014LoginRequest\022\013\n\003key\030\001 \001(\t\"\017\n\rLog"
      "outRequest*Z\n\013MessageType\022\t\n\005LOGIN\020\000\022\n\n\006"
      "LOGOUT\020\001\022\020\n\014INSERT_ORDER\020\002\022\020\n\014CANCEL_ORD"
      "ER\020\003\022\020\n\014AMMEND_ORDER\020\004b\006proto3"
  };
  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
      descriptor, 190);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "libs/protocol/exchange.proto", &protobuf_RegisterTypes);
}

void AddDescriptors() {
  static ::google::protobuf::internal::once_flag once;
  ::google::protobuf::internal::call_once(once, AddDescriptorsImpl);
}
// Force AddDescriptors() to be called at dynamic initialization time.
struct StaticDescriptorInitializer {
  StaticDescriptorInitializer() {
    AddDescriptors();
  }
} static_descriptor_initializer;
}  // namespace protobuf_libs_2fprotocol_2fexchange_2eproto
namespace Sim {
namespace Protocol {
const ::google::protobuf::EnumDescriptor* MessageType_descriptor() {
  protobuf_libs_2fprotocol_2fexchange_2eproto::protobuf_AssignDescriptorsOnce();
  return protobuf_libs_2fprotocol_2fexchange_2eproto::file_level_enum_descriptors[0];
}
bool MessageType_IsValid(int value) {
  switch (value) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      return true;
    default:
      return false;
  }
}


// ===================================================================

void LoginRequest::InitAsDefaultInstance() {
}
#if !defined(_MSC_VER) || _MSC_VER >= 1900
const int LoginRequest::kKeyFieldNumber;
#endif  // !defined(_MSC_VER) || _MSC_VER >= 1900

LoginRequest::LoginRequest()
  : ::google::protobuf::Message(), _internal_metadata_(NULL) {
  ::google::protobuf::internal::InitSCC(
      &protobuf_libs_2fprotocol_2fexchange_2eproto::scc_info_LoginRequest.base);
  SharedCtor();
  // @@protoc_insertion_point(constructor:Sim.Protocol.LoginRequest)
}
LoginRequest::LoginRequest(const LoginRequest& from)
  : ::google::protobuf::Message(),
      _internal_metadata_(NULL) {
  _internal_metadata_.MergeFrom(from._internal_metadata_);
  key_.UnsafeSetDefault(&::google::protobuf::internal::GetEmptyStringAlreadyInited());
  if (from.key().size() > 0) {
    key_.AssignWithDefault(&::google::protobuf::internal::GetEmptyStringAlreadyInited(), from.key_);
  }
  // @@protoc_insertion_point(copy_constructor:Sim.Protocol.LoginRequest)
}

void LoginRequest::SharedCtor() {
  key_.UnsafeSetDefault(&::google::protobuf::internal::GetEmptyStringAlreadyInited());
}

LoginRequest::~LoginRequest() {
  // @@protoc_insertion_point(destructor:Sim.Protocol.LoginRequest)
  SharedDtor();
}

void LoginRequest::SharedDtor() {
  key_.DestroyNoArena(&::google::protobuf::internal::GetEmptyStringAlreadyInited());
}

void LoginRequest::SetCachedSize(int size) const {
  _cached_size_.Set(size);
}
const ::google::protobuf::Descriptor* LoginRequest::descriptor() {
  ::protobuf_libs_2fprotocol_2fexchange_2eproto::protobuf_AssignDescriptorsOnce();
  return ::protobuf_libs_2fprotocol_2fexchange_2eproto::file_level_metadata[kIndexInFileMessages].descriptor;
}

const LoginRequest& LoginRequest::default_instance() {
  ::google::protobuf::internal::InitSCC(&protobuf_libs_2fprotocol_2fexchange_2eproto::scc_info_LoginRequest.base);
  return *internal_default_instance();
}


void LoginRequest::Clear() {
// @@protoc_insertion_point(message_clear_start:Sim.Protocol.LoginRequest)
  ::google::protobuf::uint32 cached_has_bits = 0;
  // Prevent compiler warnings about cached_has_bits being unused
  (void) cached_has_bits;

  key_.ClearToEmptyNoArena(&::google::protobuf::internal::GetEmptyStringAlreadyInited());
  _internal_metadata_.Clear();
}

bool LoginRequest::MergePartialFromCodedStream(
    ::google::protobuf::io::CodedInputStream* input) {
#define DO_(EXPRESSION) if (!GOOGLE_PREDICT_TRUE(EXPRESSION)) goto failure
  ::google::protobuf::uint32 tag;
  // @@protoc_insertion_point(parse_start:Sim.Protocol.LoginRequest)
  for (;;) {
    ::std::pair<::google::protobuf::uint32, bool> p = input->ReadTagWithCutoffNoLastTag(127u);
    tag = p.first;
    if (!p.second) goto handle_unusual;
    switch (::google::protobuf::internal::WireFormatLite::GetTagFieldNumber(tag)) {
      // string key = 1;
      case 1: {
        if (static_cast< ::google::protobuf::uint8>(tag) ==
            static_cast< ::google::protobuf::uint8>(10u /* 10 & 0xFF */)) {
          DO_(::google::protobuf::internal::WireFormatLite::ReadString(
                input, this->mutable_key()));
          DO_(::google::protobuf::internal::WireFormatLite::VerifyUtf8String(
            this->key().data(), static_cast<int>(this->key().length()),
            ::google::protobuf::internal::WireFormatLite::PARSE,
            "Sim.Protocol.LoginRequest.key"));
        } else {
          goto handle_unusual;
        }
        break;
      }

      default: {
      handle_unusual:
        if (tag == 0) {
          goto success;
        }
        DO_(::google::protobuf::internal::WireFormat::SkipField(
              input, tag, _internal_metadata_.mutable_unknown_fields()));
        break;
      }
    }
  }
success:
  // @@protoc_insertion_point(parse_success:Sim.Protocol.LoginRequest)
  return true;
failure:
  // @@protoc_insertion_point(parse_failure:Sim.Protocol.LoginRequest)
  return false;
#undef DO_
}

void LoginRequest::SerializeWithCachedSizes(
    ::google::protobuf::io::CodedOutputStream* output) const {
  // @@protoc_insertion_point(serialize_start:Sim.Protocol.LoginRequest)
  ::google::protobuf::uint32 cached_has_bits = 0;
  (void) cached_has_bits;

  // string key = 1;
  if (this->key().size() > 0) {
    ::google::protobuf::internal::WireFormatLite::VerifyUtf8String(
      this->key().data(), static_cast<int>(this->key().length()),
      ::google::protobuf::internal::WireFormatLite::SERIALIZE,
      "Sim.Protocol.LoginRequest.key");
    ::google::protobuf::internal::WireFormatLite::WriteStringMaybeAliased(
      1, this->key(), output);
  }

  if ((_internal_metadata_.have_unknown_fields() &&  ::google::protobuf::internal::GetProto3PreserveUnknownsDefault())) {
    ::google::protobuf::internal::WireFormat::SerializeUnknownFields(
        (::google::protobuf::internal::GetProto3PreserveUnknownsDefault()   ? _internal_metadata_.unknown_fields()   : _internal_metadata_.default_instance()), output);
  }
  // @@protoc_insertion_point(serialize_end:Sim.Protocol.LoginRequest)
}

::google::protobuf::uint8* LoginRequest::InternalSerializeWithCachedSizesToArray(
    bool deterministic, ::google::protobuf::uint8* target) const {
  (void)deterministic; // Unused
  // @@protoc_insertion_point(serialize_to_array_start:Sim.Protocol.LoginRequest)
  ::google::protobuf::uint32 cached_has_bits = 0;
  (void) cached_has_bits;

  // string key = 1;
  if (this->key().size() > 0) {
    ::google::protobuf::internal::WireFormatLite::VerifyUtf8String(
      this->key().data(), static_cast<int>(this->key().length()),
      ::google::protobuf::internal::WireFormatLite::SERIALIZE,
      "Sim.Protocol.LoginRequest.key");
    target =
      ::google::protobuf::internal::WireFormatLite::WriteStringToArray(
        1, this->key(), target);
  }

  if ((_internal_metadata_.have_unknown_fields() &&  ::google::protobuf::internal::GetProto3PreserveUnknownsDefault())) {
    target = ::google::protobuf::internal::WireFormat::SerializeUnknownFieldsToArray(
        (::google::protobuf::internal::GetProto3PreserveUnknownsDefault()   ? _internal_metadata_.unknown_fields()   : _internal_metadata_.default_instance()), target);
  }
  // @@protoc_insertion_point(serialize_to_array_end:Sim.Protocol.LoginRequest)
  return target;
}

size_t LoginRequest::ByteSizeLong() const {
// @@protoc_insertion_point(message_byte_size_start:Sim.Protocol.LoginRequest)
  size_t total_size = 0;

  if ((_internal_metadata_.have_unknown_fields() &&  ::google::protobuf::internal::GetProto3PreserveUnknownsDefault())) {
    total_size +=
      ::google::protobuf::internal::WireFormat::ComputeUnknownFieldsSize(
        (::google::protobuf::internal::GetProto3PreserveUnknownsDefault()   ? _internal_metadata_.unknown_fields()   : _internal_metadata_.default_instance()));
  }
  // string key = 1;
  if (this->key().size() > 0) {
    total_size += 1 +
      ::google::protobuf::internal::WireFormatLite::StringSize(
        this->key());
  }

  int cached_size = ::google::protobuf::internal::ToCachedSize(total_size);
  SetCachedSize(cached_size);
  return total_size;
}

void LoginRequest::MergeFrom(const ::google::protobuf::Message& from) {
// @@protoc_insertion_point(generalized_merge_from_start:Sim.Protocol.LoginRequest)
  GOOGLE_DCHECK_NE(&from, this);
  const LoginRequest* source =
      ::google::protobuf::internal::DynamicCastToGenerated<const LoginRequest>(
          &from);
  if (source == NULL) {
  // @@protoc_insertion_point(generalized_merge_from_cast_fail:Sim.Protocol.LoginRequest)
    ::google::protobuf::internal::ReflectionOps::Merge(from, this);
  } else {
  // @@protoc_insertion_point(generalized_merge_from_cast_success:Sim.Protocol.LoginRequest)
    MergeFrom(*source);
  }
}

void LoginRequest::MergeFrom(const LoginRequest& from) {
// @@protoc_insertion_point(class_specific_merge_from_start:Sim.Protocol.LoginRequest)
  GOOGLE_DCHECK_NE(&from, this);
  _internal_metadata_.MergeFrom(from._internal_metadata_);
  ::google::protobuf::uint32 cached_has_bits = 0;
  (void) cached_has_bits;

  if (from.key().size() > 0) {

    key_.AssignWithDefault(&::google::protobuf::internal::GetEmptyStringAlreadyInited(), from.key_);
  }
}

void LoginRequest::CopyFrom(const ::google::protobuf::Message& from) {
// @@protoc_insertion_point(generalized_copy_from_start:Sim.Protocol.LoginRequest)
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

void LoginRequest::CopyFrom(const LoginRequest& from) {
// @@protoc_insertion_point(class_specific_copy_from_start:Sim.Protocol.LoginRequest)
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool LoginRequest::IsInitialized() const {
  return true;
}

void LoginRequest::Swap(LoginRequest* other) {
  if (other == this) return;
  InternalSwap(other);
}
void LoginRequest::InternalSwap(LoginRequest* other) {
  using std::swap;
  key_.Swap(&other->key_, &::google::protobuf::internal::GetEmptyStringAlreadyInited(),
    GetArenaNoVirtual());
  _internal_metadata_.Swap(&other->_internal_metadata_);
}

::google::protobuf::Metadata LoginRequest::GetMetadata() const {
  protobuf_libs_2fprotocol_2fexchange_2eproto::protobuf_AssignDescriptorsOnce();
  return ::protobuf_libs_2fprotocol_2fexchange_2eproto::file_level_metadata[kIndexInFileMessages];
}


// ===================================================================

void LogoutRequest::InitAsDefaultInstance() {
}
#if !defined(_MSC_VER) || _MSC_VER >= 1900
#endif  // !defined(_MSC_VER) || _MSC_VER >= 1900

LogoutRequest::LogoutRequest()
  : ::google::protobuf::Message(), _internal_metadata_(NULL) {
  ::google::protobuf::internal::InitSCC(
      &protobuf_libs_2fprotocol_2fexchange_2eproto::scc_info_LogoutRequest.base);
  SharedCtor();
  // @@protoc_insertion_point(constructor:Sim.Protocol.LogoutRequest)
}
LogoutRequest::LogoutRequest(const LogoutRequest& from)
  : ::google::protobuf::Message(),
      _internal_metadata_(NULL) {
  _internal_metadata_.MergeFrom(from._internal_metadata_);
  // @@protoc_insertion_point(copy_constructor:Sim.Protocol.LogoutRequest)
}

void LogoutRequest::SharedCtor() {
}

LogoutRequest::~LogoutRequest() {
  // @@protoc_insertion_point(destructor:Sim.Protocol.LogoutRequest)
  SharedDtor();
}

void LogoutRequest::SharedDtor() {
}

void LogoutRequest::SetCachedSize(int size) const {
  _cached_size_.Set(size);
}
const ::google::protobuf::Descriptor* LogoutRequest::descriptor() {
  ::protobuf_libs_2fprotocol_2fexchange_2eproto::protobuf_AssignDescriptorsOnce();
  return ::protobuf_libs_2fprotocol_2fexchange_2eproto::file_level_metadata[kIndexInFileMessages].descriptor;
}

const LogoutRequest& LogoutRequest::default_instance() {
  ::google::protobuf::internal::InitSCC(&protobuf_libs_2fprotocol_2fexchange_2eproto::scc_info_LogoutRequest.base);
  return *internal_default_instance();
}


void LogoutRequest::Clear() {
// @@protoc_insertion_point(message_clear_start:Sim.Protocol.LogoutRequest)
  ::google::protobuf::uint32 cached_has_bits = 0;
  // Prevent compiler warnings about cached_has_bits being unused
  (void) cached_has_bits;

  _internal_metadata_.Clear();
}

bool LogoutRequest::MergePartialFromCodedStream(
    ::google::protobuf::io::CodedInputStream* input) {
#define DO_(EXPRESSION) if (!GOOGLE_PREDICT_TRUE(EXPRESSION)) goto failure
  ::google::protobuf::uint32 tag;
  // @@protoc_insertion_point(parse_start:Sim.Protocol.LogoutRequest)
  for (;;) {
    ::std::pair<::google::protobuf::uint32, bool> p = input->ReadTagWithCutoffNoLastTag(127u);
    tag = p.first;
    if (!p.second) goto handle_unusual;
  handle_unusual:
    if (tag == 0) {
      goto success;
    }
    DO_(::google::protobuf::internal::WireFormat::SkipField(
          input, tag, _internal_metadata_.mutable_unknown_fields()));
  }
success:
  // @@protoc_insertion_point(parse_success:Sim.Protocol.LogoutRequest)
  return true;
failure:
  // @@protoc_insertion_point(parse_failure:Sim.Protocol.LogoutRequest)
  return false;
#undef DO_
}

void LogoutRequest::SerializeWithCachedSizes(
    ::google::protobuf::io::CodedOutputStream* output) const {
  // @@protoc_insertion_point(serialize_start:Sim.Protocol.LogoutRequest)
  ::google::protobuf::uint32 cached_has_bits = 0;
  (void) cached_has_bits;

  if ((_internal_metadata_.have_unknown_fields() &&  ::google::protobuf::internal::GetProto3PreserveUnknownsDefault())) {
    ::google::protobuf::internal::WireFormat::SerializeUnknownFields(
        (::google::protobuf::internal::GetProto3PreserveUnknownsDefault()   ? _internal_metadata_.unknown_fields()   : _internal_metadata_.default_instance()), output);
  }
  // @@protoc_insertion_point(serialize_end:Sim.Protocol.LogoutRequest)
}

::google::protobuf::uint8* LogoutRequest::InternalSerializeWithCachedSizesToArray(
    bool deterministic, ::google::protobuf::uint8* target) const {
  (void)deterministic; // Unused
  // @@protoc_insertion_point(serialize_to_array_start:Sim.Protocol.LogoutRequest)
  ::google::protobuf::uint32 cached_has_bits = 0;
  (void) cached_has_bits;

  if ((_internal_metadata_.have_unknown_fields() &&  ::google::protobuf::internal::GetProto3PreserveUnknownsDefault())) {
    target = ::google::protobuf::internal::WireFormat::SerializeUnknownFieldsToArray(
        (::google::protobuf::internal::GetProto3PreserveUnknownsDefault()   ? _internal_metadata_.unknown_fields()   : _internal_metadata_.default_instance()), target);
  }
  // @@protoc_insertion_point(serialize_to_array_end:Sim.Protocol.LogoutRequest)
  return target;
}

size_t LogoutRequest::ByteSizeLong() const {
// @@protoc_insertion_point(message_byte_size_start:Sim.Protocol.LogoutRequest)
  size_t total_size = 0;

  if ((_internal_metadata_.have_unknown_fields() &&  ::google::protobuf::internal::GetProto3PreserveUnknownsDefault())) {
    total_size +=
      ::google::protobuf::internal::WireFormat::ComputeUnknownFieldsSize(
        (::google::protobuf::internal::GetProto3PreserveUnknownsDefault()   ? _internal_metadata_.unknown_fields()   : _internal_metadata_.default_instance()));
  }
  int cached_size = ::google::protobuf::internal::ToCachedSize(total_size);
  SetCachedSize(cached_size);
  return total_size;
}

void LogoutRequest::MergeFrom(const ::google::protobuf::Message& from) {
// @@protoc_insertion_point(generalized_merge_from_start:Sim.Protocol.LogoutRequest)
  GOOGLE_DCHECK_NE(&from, this);
  const LogoutRequest* source =
      ::google::protobuf::internal::DynamicCastToGenerated<const LogoutRequest>(
          &from);
  if (source == NULL) {
  // @@protoc_insertion_point(generalized_merge_from_cast_fail:Sim.Protocol.LogoutRequest)
    ::google::protobuf::internal::ReflectionOps::Merge(from, this);
  } else {
  // @@protoc_insertion_point(generalized_merge_from_cast_success:Sim.Protocol.LogoutRequest)
    MergeFrom(*source);
  }
}

void LogoutRequest::MergeFrom(const LogoutRequest& from) {
// @@protoc_insertion_point(class_specific_merge_from_start:Sim.Protocol.LogoutRequest)
  GOOGLE_DCHECK_NE(&from, this);
  _internal_metadata_.MergeFrom(from._internal_metadata_);
  ::google::protobuf::uint32 cached_has_bits = 0;
  (void) cached_has_bits;

}

void LogoutRequest::CopyFrom(const ::google::protobuf::Message& from) {
// @@protoc_insertion_point(generalized_copy_from_start:Sim.Protocol.LogoutRequest)
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

void LogoutRequest::CopyFrom(const LogoutRequest& from) {
// @@protoc_insertion_point(class_specific_copy_from_start:Sim.Protocol.LogoutRequest)
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool LogoutRequest::IsInitialized() const {
  return true;
}

void LogoutRequest::Swap(LogoutRequest* other) {
  if (other == this) return;
  InternalSwap(other);
}
void LogoutRequest::InternalSwap(LogoutRequest* other) {
  using std::swap;
  _internal_metadata_.Swap(&other->_internal_metadata_);
}

::google::protobuf::Metadata LogoutRequest::GetMetadata() const {
  protobuf_libs_2fprotocol_2fexchange_2eproto::protobuf_AssignDescriptorsOnce();
  return ::protobuf_libs_2fprotocol_2fexchange_2eproto::file_level_metadata[kIndexInFileMessages];
}


// @@protoc_insertion_point(namespace_scope)
}  // namespace Protocol
}  // namespace Sim
namespace google {
namespace protobuf {
template<> GOOGLE_PROTOBUF_ATTRIBUTE_NOINLINE ::Sim::Protocol::LoginRequest* Arena::CreateMaybeMessage< ::Sim::Protocol::LoginRequest >(Arena* arena) {
  return Arena::CreateInternal< ::Sim::Protocol::LoginRequest >(arena);
}
template<> GOOGLE_PROTOBUF_ATTRIBUTE_NOINLINE ::Sim::Protocol::LogoutRequest* Arena::CreateMaybeMessage< ::Sim::Protocol::LogoutRequest >(Arena* arena) {
  return Arena::CreateInternal< ::Sim::Protocol::LogoutRequest >(arena);
}
}  // namespace protobuf
}  // namespace google

// @@protoc_insertion_point(global_scope)
