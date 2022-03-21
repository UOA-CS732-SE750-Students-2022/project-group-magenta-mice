#pragma once

#include <google/protobuf/io/coded_stream.h>
#include <google/protobuf/io/zero_copy_stream.h>
#include <google/protobuf/message_lite.h>

namespace google::protobuf::io {
bool writeDelimitedTo(const google::protobuf::MessageLite &message,
                      google::protobuf::io::ZeroCopyOutputStream *rawOutput);

bool readDelimitedFrom(google::protobuf::io::ZeroCopyInputStream *rawInput,
                       google::protobuf::MessageLite *message);
} // namespace google::protobuf::io
